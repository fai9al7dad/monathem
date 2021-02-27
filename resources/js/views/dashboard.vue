<template>
  <v-main>
    <v-container>
      <div class="d-flex justify-center mt-7 " elevation ="5">
          <v-btn v-if="editing" @click="editing = false" text color="primary"><v-icon left>mdi-plus</v-icon> اضف مشروع </v-btn>

          <div class="d-flex flex-column add-project" v-else>

            <v-text-field class="mb-3" label="اضف مشروع" outlined dense hide-details v-model="name" @keyup.enter="submit"></v-text-field>
            <div class="d-flex">
              <v-btn @click.prevent="submit"   type="submit" color="primary" elevation="0" small>add</v-btn>
              <v-icon class="mr-2" @click="editing = true">mdi-close</v-icon>
            </div>

          </div>
          
      </div>
    </v-container>

    <v-snackbar  v-model="confirmDelete" color="success">
      تم الحذف بنجاح
      <template v-slot:action="{ attrs }">
        <v-btn  text v-bind="attrs" @click="snackbar = false">
          اغلاق
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data(){
    return {
      editing:true,
      name:'',
      confirmDelete: false
    }
  },
  methods:{
    ...mapActions({
        addProject : 'projects/addProject',
        getProjects: 'projects/getProjects'

    }),

    async submit(){
      await this.addProject({name: this.name});
      this.name= '';
      let lastitem = this.projects[this.projects.length - 1];
      this.$router.push('/project' +'/'+ lastitem.id);
  } ,
  reload(){
      if (this.$route.params.reload){
          this.confirmDelete = true;

      }
    }
  },
  computed:{
        ...mapGetters({
            projects: 'projects/projects'
        })
    },
  created(){
    this.reload();
  }
  

}
</script>

<style scoped>
.add-project{
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,.05);
}
input{
    margin-bottom: 12px;
    padding: 10px 20px;
    box-shadow: inset 0 0 0 2px #395177;
}
input:focus{
  outline:none
}
</style>