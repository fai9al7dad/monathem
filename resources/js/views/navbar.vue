<template>
<div v-if="$store.state.auth.authenticated">
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>المنظم</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temprary right app>
        <navitems/>
    </v-navigation-drawer>
</div>
</template>

<script>
import navitems from './components/navitems';

export default {
    components:{
        navitems
    },
    data(){
        return{
            drawer: true,
            group: null,
            projects: null
        }
    },
    
    methods:{
        logout(){
            axios.post('api/logout').then(()=>{
                this.$router.push('/login');
            })
        },

       
    },


    
}
</script>