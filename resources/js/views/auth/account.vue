<template>
<div>
  
    <v-main  v-if="!$store.state.auth.authenticated">
      <v-container>
         <v-slide-y-transition group>
            <h3>user info</h3>
            <h4 v-for = "(users,index) in user" :key="index">{{index}}: <span class="font-weight-thin">{{users}}</span>    </h4>
         </v-slide-y-transition>
      </v-container>
    </v-main>
</div>
</template>

<script>
export default {
  data(){
    return{
      user:null,
    }
  },
  methods:{
    getUser(){
    }
  },
  created() {
      this.getUser();
  }

}
</script>