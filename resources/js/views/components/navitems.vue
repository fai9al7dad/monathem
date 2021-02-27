<template>
  <v-list nav>
        <v-subheader>الإعدادات</v-subheader>
        <v-list-item-group v-model="selectedItem"  color="secondary">
            <!-- الحساب -->

            <v-list-item to="/account">
                <v-list-item-icon>
                    <v-icon color="accent">mdi-account</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold accent--text">الحساب</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- تسجيل الخروج -->

            <v-list-item @click="logout">
                <v-list-item-icon>
                    <v-icon color="accent">mdi-exit-to-app</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold accent--text">تسجيل الخروج</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- المهام -->

            <v-subheader>المهام</v-subheader>

            <!-- المشاريع -->

            <v-list-group class="list-icon" no-action color="secondary"  :value="true" prepend-icon="mdi-relative-scale">

                <template v-slot:activator>
                <v-list-item-title class="accent--text font-weight-bold">المشاريع</v-list-item-title>
                </template>
                <v-list-item v-for="project in projects" :key="project.id" @click="projectid(project)">
                    <v-list-item-content>
                        <v-list-item-title>{{project.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-text-field v-model = "name" append-icon="mdi-plus" @click:append="submit" @keyup.enter="submit" label="اضف مشروع" >
                    </v-text-field>
                    
                </v-list-item>
            </v-list-group>
          
            <v-list-item to="/schedule">
                <v-list-item-icon>
                    <v-icon color="accent">mdi-calendar</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold accent--text">مواعيد المهام</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

    </v-list>

    
</template>


<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {

    data(){
        return{
            name: '',
            selectedItem: null,
        }
    },

    methods:{
        ...mapActions({
            signOut: 'auth/signOut',
            addProject : 'projects/addProject',
            getProjects: 'projects/getProjects'
        }),
        async logout(){
                await this.signOut();
                this.$router.push('/login')
        },
        async submit(){
            await this.addProject({name: this.name});
            this.name= '';
            let lastitem = this.projects[this.projects.length - 1];
            this.$router.push('/project' +'/'+ lastitem.id);
        },
        projectid(project){
            this.$router.push('/project' +'/'+ project.id);
        }
    },
    computed:{
        ...mapGetters({
            projects: 'projects/projects'
        })
    },
    async mounted(){
        await this.getProjects();
    }
}
</script>

<style scoped>
.mdi:before {
    color: #97A6BC !important;
}
</style>