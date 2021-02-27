<template>
    <div>
        <v-chip v-if="notDue" label color="accent">
            <v-icon left>mdi-calendar</v-icon>
            {{task.due_date}}
        </v-chip>
        <v-card class="card d-flex justify-space-between align-center mb-5" min-width="350px" :color="task.color">
            <div class="right">
                <v-card-title class="white--text font-weight-bold ">
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
    </div>
</template>
<script>
export default {
    props:[
        'task',
        'notDue'
    ],
     data(){
         return{
            selectedDialogTask: '',
            dialog: false,
         }
     },
     methods:{
        doneTask(task){
            this.$store.dispatch('tasks/markDone', task);
            this.dialog = false;
            this.tasks = this.tasks.filter((todo) => todo.id != task.id)
        },
        deleteDialog(task){
            this.dialog = true
            this.selectedDialogTask = task
        },
     }
}
</script>
<style scoped>
.theme--light.v-card {
    box-shadow: none !important;
}
.v-chip--label {
    border-radius: 4px 4px 0px 0px !important;
}
.v-card {
    border-radius: 4px 0px 4px 4px !important;
}
.left .successbtn:hover{
  color: #4CAF50
}
.theme--light.v-card .v-card__subtitle{
  color: rgb(255 255 255 / 60%)
}  


</style>