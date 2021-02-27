<template>
    <v-card min-width="350px" elevation="0" outlined>
        <v-list class="list" dense>
            <div v-if="tasks.length">
                <v-list-item class="list-item"  v-for="task in tasks" :key=task.id >  
                    <v-list-item-content class="task-body">
                        <v-list-item-title class="font-weight-bold" v-if="task !== editingTask " @click="editTask(task)" @blur="endEditing(task)">
                            {{task.body}}
                        </v-list-item-title>

                        <!-- editing -->
                        <v-text-field dense v-else v-focus @keyup.enter="endEditing(task)" @keyup.esc="cancelEdit(task)" @blur="endEditing(task)" v-model="task.body" ></v-text-field>

                        <v-list-item-subtitle v-if="task.due_date">
                            <v-icon small light>mdi-calendar</v-icon>
                            {{task.due_date}}
                        </v-list-item-subtitle>

                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon class="ml-2 delete-icon" @click="deleteDialog(task)">mdi-delete</v-icon>

                        <v-menu transition="slide-x-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
                            </template>
    
                            <v-list>
                                <v-list-item-group v-model="menuselect" color="secondary">
                                    <v-list-item v-for="item in popupmenu" :key="item.status" @click="changeStatus(task.status, item.status, task.id)" :disabled= "item.status == task.status">
                                        <v-list-item-title>{{item.title }}</v-list-item-title>

                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item @click="dueDate_dialog(task)" :disabled="task.status == 'done'">
                                        <v-list-item-title v-if="task.due_date">تغيير الموعد</v-list-item-title>
                                        <v-list-item-title v-else>تحديد موعد</v-list-item-title>
                                    </v-list-item>

                                    <v-list-item v-if="task.due_date && task.status !='done'" @click="deleteDueDate(task)">
                                        <v-list-item-title class="red--text">الغاء الموعد</v-list-item-title>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </v-list-item-icon>

                    <!-- delete confirmation dialog -->

                    <v-dialog v-model="dialog" max-width="290" :retain-focus="false">
                        <v-card>
                            <v-card-title>
                                تأكيد الحذف؟
                            </v-card-title>
                            <v-card-text>
                                سوف تقوم بحذف المهمة <span class="font-weight-bold">"{{selectedDialogTask.body}}"</span> 
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="accent darken-1" text @click="dialog = false">
                                الغاء
                            </v-btn>

                        <v-btn color="error darken-1" text @click="deleteTask(selectedDialogTask)">
                                تأكيد
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- due date dialog -->

                    <v-dialog v-model="dueDateDialog" width="290px" :retain-focus="false">
                        <v-date-picker v-model="date" >
                             <v-btn text color="primary" @click="dueDateDialog = false">
                                الغاء
                            </v-btn>
                            <v-btn text color="primary" @click="setDueDate(dueDateTask,date)">
                                اختيار
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-list-item>
            </div>

            <div v-else class="empty-task">
               <p>لا يوجد مهام هنا</p>
            </div>
        </v-list>

        <!-- adding -->
            <div v-show="status == 'todo'">
                <v-btn v-if="editing" @click="editing = false" text color="primary"><v-icon left>mdi-plus</v-icon> أضف مهمة </v-btn>

                <div class="d-flex flex-column py-0 pb-3 rounded add-project" style="box-shadow:none; padding:10px" v-else>
                    <v-text-field @keyup.enter= "addTask" class ="mb-3" label="اسم المهمة" outlined dense hide-details v-model="body"></v-text-field>
                    <div class="d-flex">
                    <v-btn @click.prevent="addTask" type="submit" color="primary" elevation="0" small>أضف</v-btn>
                    <v-icon class="mr-2" @click="editing = true"  >mdi-close</v-icon>
                    </div>
                </div>
            </div>
                
            
    </v-card>


    
</template>

<script>
import { mapActions} from 'vuex';

export default {
    data(){
        return{
            editing: true,
            body:'',
            editingTask: {},
            beforeEditingCache: '',
            dialog: false,
            selectedDialogTask: '',
            menuselect: '',
            loading: false,
            num: 1,
            dueDateDialog: false,
            date:'',
            dueDateTask: '',
            popupmenu:[
                {title: 'نقل الى المهام', status: 'todo'},
                {title: 'نقل الى قيد العمل', status: 'doing'},
                {title: 'نقل الى المنجزة', status: 'done'},
            ],
        }
    },
    methods:{     
        ...mapActions({
            add: 'tasks/addTask',
        }),  
        async addTask(){
            await this.add({body: this.body, projectid: this.$route.params.id})
            this.body= '';
            
        },
        deleteDialog(task){
            this.dialog = true
            this.selectedDialogTask = task
        },
        deleteTask(task){
            if(task.status == 'todo'){
                this.$store.dispatch('tasks/deleteTodoTask', task)
                this.dialog = false
            }
            else if(task.status == 'doing'){
                this.$store.dispatch('tasks/deleteDoingTask', task)
                this.dialog = false
            }
            else{
                this.$store.dispatch('tasks/deleteDoneTask', task)
                this.dialog = false
            }
        },

        editTask(task){
            this.editingTask = task
            this.beforeEditingCache = task.body
        },
        endEditing(task) {
            this.editingTask= {}
             if (task.body.trim() === '') {
                task.body = this.beforeEditingCache
            } 
            else {
                axios.post('api/edittask', task)
            }
        },
        cancelEdit(task){
            this.editingTask = {};
            task.body = this.beforeEditingCache
        },
        async changeStatus(ostatus,nstatus, id){
            await this.$store.dispatch('tasks/changeStatus',{id: id, ostatus: ostatus, nstatus: nstatus})
        },
        dueDate_dialog(task){
            this.dueDateDialog = true
            this.dueDateTask = task
        },
        async setDueDate(task,date){
            await this.$store.dispatch('tasks/setDueDate',{task: task, date:date});
            this.dueDateDialog = false
        },
        async deleteDueDate(task){
            this.$store.dispatch('tasks/deleteDueDate', {task: task})
        },
        onEnd(evt){
            this.newIndex = evt.newIndex;
            console.log(evt.newIndex);
        }
    },
     directives: {
        focus: {
            inserted: function (el) {
            let childData = el.querySelectorAll("input")[0]; 
            childData.focus()
            }
        }
    },
    props:[
        'tasks',
        "status"
    ]
}
</script>


<style scoped>

.add-project{
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,.05);
}
.list{
    padding:10px;
}
.list-item{
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #e4e4e4;
    background: #f7f8fa;
    cursor: pointer;
    font-weight: bold;
}
.empty-task{
    border: 2px dashed #cecece;
    background: #f7f8fa;
    text-align: center;
    padding: 10px;
    color: #717273;
}
.empty-task p{
    margin: 0;
}
.delete-icon:hover{
    color: #FF5252;
}
.menu-icon:hover{
    color: #328AF1
}

/* animation */

.ghost{
    opacity: 0;
}

</style>