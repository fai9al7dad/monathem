<template>
  <v-app>
    <navbar />
      <router-view/>
  </v-app>
</template>


<script>
import navbar from './navbar';
    export default {
        components:{
          navbar
        },

    }
</script>


<style>

  *{
  font-family: 'Tajawal', sans-serif;

  }
  #app{
    background: #F7F8FA;
  }


</style>