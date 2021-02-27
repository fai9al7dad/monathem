<template>
  <v-main>
    <v-container class="mt-5">
      <div class="containers" v-if="tasks.length">
      <v-row class="row">
        <v-col class="col" cols="12" md="4">
          <h2 class="accent--text mb-5">المهام الفائتة</h2>
          <v-card v-for="task in tasks" :key="task.id">
            <div v-if="task.dueYesterday"> 
              <taskSchedule class="task" :task = "task"/>
            </div>
          </v-card>
        </v-col>
        <v-col class="col" cols="12" md="4">
          <h2 class="accent--text mb-5">مهام اليوم</h2>
          <v-card v-for="task in tasks" :key="task.id">
            <div v-if="task.dueToday"> 
              <taskSchedule class="task" :task = "task"/>
            </div>

          </v-card>
        </v-col>
        <v-col class="col" cols="12" md="4">
          <h2 class="accent--text mb-5">مهام متبقي عليها</h2>
          <v-card v-for="task in tasks" :key="task.id">
            <div v-if="!task.dueToday && !task.dueYesterday"> 
              <taskSchedule class="task" :task = "task" notDue=true />
            </div>
          </v-card>
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
import taskSchedule from './components/taskSchedule';
export default {
  components:{
    taskSchedule
  },
  data(){
    return{
      tasks:[],
    }
  },
  methods:{

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

.no-task{
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100vh;
  color: #97A6BC;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow:none;
    background: #f7f8fa;
}

@media (max-width:1024px){
    .containers{
      width: 800px;
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
    }
    .row{
      flex: none !important;
      flex-wrap: nowrap;
      
    }
    .col{
      flex: 0 !important;
      scroll-snap-align: end;

    }
    .col:nth-of-type(3){
      padding-left: 100px
    }

  }
@media (max-width:600px){
    .containers{
      width: 450px;
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
    }
    .row{
      flex: none !important;
      flex-wrap: nowrap;
      
    }
    .col{
      flex: 0 !important;
      scroll-snap-align: end;

    }
    .col:nth-of-type(3){
      padding-left: 100px
    }

  }
</style>