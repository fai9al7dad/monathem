<template>
  <v-main>
    <v-container class="mt-4">
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <v-sheet class="color-picker" :color="project.color" height="25px" width="25px" @click="colorPicker = true" rounded></v-sheet>
            <h2 class="accent--text mr-5">{{project.name}}</h2>
          </div>
          <v-icon class="delete-icon" @click="dialog = true">mdi-delete</v-icon>
      </div>
    </v-container>
    
      <v-container class="containers">
        
          
          <v-row class="row">

              <v-col class="col" cols=12 md=4 sm=0>
                  <div class="text--secondary mb-2">
                       المهام
                  </div>
                <tasks-todo class="tasks" :tasks="todo_tasks" status="todo" ></tasks-todo>
              </v-col>

              <v-col class="col" cols=12 md=4 sm=0>
                  <div class="text--secondary mb-2">
                      قيد العمل
                  </div>
                <tasks-todo class="tasks" :tasks="doing_tasks"></tasks-todo>
              </v-col>

              <v-col class="col" cols=12 md=4 sm=0>
                  <div class="text--secondary mb-2" >
                      المنجزة
                  </div>
                    <tasks-todo class="tasks" :tasks="done_tasks"></tasks-todo>
              </v-col>


          </v-row>

      </v-container>
      <v-overlay :value="overlay" light opacity="1" z-index="200" absolute>
        <v-progress-circular
            color="primary"
            indeterminate
            size="64"
        ></v-progress-circular>
    </v-overlay>

    <v-dialog v-model="dialog" max-width="290" :retain-focus="false">
      <v-card>
          <v-card-title>
              تأكيد الحذف؟
          </v-card-title>
          <v-card-text>
              سوف تقوم بحذف المشروع <span class="font-weight-bold">"{{project.name}}"</span> 
          </v-card-text>

          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent darken-1" text @click="dialog = false">
              الغاء
          </v-btn>

          <v-btn color="error darken-1" text @click="deleteProject(project)">
              تأكيد
          </v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>

    <v-dialog v-model="colorPicker" :retain-focus=false width="250px">
        <v-card>

        <v-color-picker
        dot-size="12"
        hide-canvas
        hide-inputs
        hide-sliders
        show-swatches
        swatches-max-height="100"
        v-model="colorChoice"
        ></v-color-picker>
        <v-card-actions>
            <v-btn color="accent darken-1" text @click="colorPicker = false">
                الغاء
            </v-btn>

            <v-btn color="success darken-1" text @click="changeProjectColor(project,colorChoice)">
                تأكيد
            </v-btn>
        </v-card-actions>
           
      </v-card>
      
    </v-dialog>
    

  </v-main>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import todotasks from './project/todotasks'
export default {
    components:{
        'tasks-todo' : todotasks,
    },
    data(){
        return{
            projectId: '',
            overlay: true,
            color: '',
            dialog: false,
            colorPicker: false,
            colorChoice: ''
        }
    },
    methods:{
        getTasks(param){
            this.$store.dispatch('tasks/getTodoTasks', param);
            this.$store.dispatch('tasks/getDoingTasks', param);
            this.$store.dispatch('tasks/getDoneTasks', param);
            setTimeout(() => {
              this.overlay = false
            }, 1000)
        },
        async deleteProject(project){
          await this.$store.dispatch('projects/deleteProject', project.id);
          this.$router.push({name:'dashboard', params: {reload: true}});
        },
        async changeProjectColor(project, color){
          await this.$store.dispatch('projects/changeProjectColor', {project: project, color: color});
          this.colorPicker = false
        }
    },
    computed:{
        ...mapState('projects',['project']),
          ...mapGetters({
            todo_tasks: 'tasks/todo_tasks',
            doing_tasks: 'tasks/doing_tasks',
            done_tasks: 'tasks/done_tasks'
        }),
      
    },
    watch: {
      '$route' (to) {
        this.overlay = true
        this.$store.dispatch('projects/getProject', to.params.id);
        this.projectId = to.params.id;
        this.getTasks(to.params.id)

      }
    },
    created(){
        this.$store.dispatch('projects/getProject', this.$route.params.id);
        this.projectId = this.$route.params.id;
        this.getTasks(this.$route.params.id)

        

    }
}
</script>

<style scoped>
  .delete-icon:hover{
    color: #FF5252;
  }
  .color-picker:hover{
    cursor:pointer
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
      flex: none;
    }
    .col{
      flex: 0 !important;
    }
    .col:nth-of-type(3){
      padding-left: 100px
    }
    .tasks{
      scroll-snap-align: end;
    }

  }
  
</style>
