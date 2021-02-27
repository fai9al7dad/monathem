<template>
<div>
  
    <v-main>
      <v-container>
           <div class="no-task">
            <v-icon color="accent" right>
              mdi-alert-decagram
            </v-icon>
            هذه الصفحة قيد العمل حاليا
          </div>
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

  },


}
</script>

<style  scoped>
.no-task{
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100vh;
  color: #97A6BC;
}
</style>