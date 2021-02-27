<template>
  <v-main>
    {{dueToday}}
    <v-container>
      <div v-if="tasks.length">
<h2 class="mb-5">المهام بالأقرب</h2>
      <v-row>
        <v-col cols="12" md="4" v-for="task in tasks" :key="task.id">
            <v-chip label color="accent" :class="{warning : task.dueToday, error: task.dueYesterday, info: task.dueTommorw}">
              <v-icon left>mdi-calendar</v-icon>
              {{task.due_date}}
            </v-chip>
            <v-card :color="task.color" class="white--text d-flex justify-space-between align-center ">
              <div class="right">
                <v-card-title>
                  {{task.body}}
                </v-card-title>
                <v-card-subtitle class="subtitle" >
                  <v-icon color="rgb(255 255 255 / 60%)" right>
                    mdi-relative-scale
                  </v-icon>
                  {{task.name}}
                </v-card-subtitle>
              </div>
              <div class="left ml-5">
                <v-btn class="successbtn" icon text @click="deleteDialog(task)">
                  <v-icon medium>
                    mdi-check-circle
                  </v-icon>
                </v-btn>
                
              </div>
            </v-card>

             <v-dialog v-model="dialog" max-width="290" :retain-focus="false">
                <v-card>
                    <v-card-title>
                        تأكيد الإنجاز؟
                    </v-card-title>
                    <v-card-text>
                        سوف تقوم بنقل المهمة <span class="font-weight-bold">"{{selectedDialogTask.body}}"</span>  الى خانة 'المنجزة' في مشروع <span class="font-weight-bold">"{{selectedDialogTask.name}}"</span>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent darken-1" text @click="dialog = false">
                        الغاء
                    </v-btn>

                <v-btn color="success" text @click="doneTask(selectedDialogTask)">
                        تأكيد
                    </v-btn>
                    </v-card-actions>
                </v-card>
              </v-dialog>
        </v-col>
      </v-row>
      </div>
      <div class="no-task" v-else>
        <v-icon color="accent" right>
          mdi-check-decagram
        </v-icon>
        ليس لديك مهام مجدولة
      </div>
    </v-container>
      
  </v-main>
</template>

<script>
export default {
  data(){
    return{
      tasks:[],
      dialog: false,
      dueToday: false,
      selectedDialogTask: '',
    }
  },
  methods:{
    doneTask(task){
      this.$store.dispatch('tasks/markDone', task);
      this.dialog = false;
      this.tasks = this.tasks.filter((todo) => todo.id != task.id)

    },
    getDue(){
      axios.get('api/alltasks').then(res=>{
      for(let i =0; i<res.data.length; i++){
        if(res.data[i].due_date && res.data[i].status != 'done'){
          this.tasks.push(res.data[i])
        }
        if(this.curDate == res.data[i].due_date){
          res.data[i]['dueToday'] = true;
        }
        else if (this.curDate > res.data[i].due_date){
          res.data[i]['dueYesterday'] = true;
        }
        else if(this.tommorwDate == res.data[i].due_date){
          res.data[i]['dueTommorw'] = true;
        }
      }
    })
    },
    deleteDialog(task){
      this.dialog = true
      this.selectedDialogTask = task
    },
  },
  computed:{
    curDate(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      return today;
    },
    tommorwDate(){
      var tommorw = new Date();
      var dd = String(tommorw.getDate() + 1).padStart(2, '0');
      var mm = String(tommorw.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = tommorw.getFullYear();

      tommorw = yyyy + '-' + mm + '-' + dd;
      return tommorw;
    }
  },

  created(){
    this.getDue();
    this.curDate;
  }

}
</script>

<style scoped>
.v-chip--label {
    border-radius: 4px 4px 0px 0px !important;
}
.v-sheet.v-card {
    border-radius: 4px 0px 4px 4px;
}
.v-card__title{
  font-weight: bold;
}

.no-task{
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100vh;
  color: #97A6BC;
}
.theme--light.v-card .v-card__subtitle{
  color: rgb(255 255 255 / 60%)
}
</style>