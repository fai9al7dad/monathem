<template>
  <v-container>
    <v-col md="6" class="mx-auto">
        <v-card >
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title class="font-weight-bold px-6">المنظم</v-toolbar-title>
            </v-toolbar>

            <v-tabs fixed-tabs v-model="tab">
                <v-tab to ="/login" class="font-weight-bold" color=accent>الدخول</v-tab>
                <v-tab to = "/register" class="font-weight-bold" color="accent">التسجيل</v-tab>
            </v-tabs>

            
        </v-card>

    <v-card rounded class="px-10 py-10">

        <div class="d-flex justify-center mb-6">
            <img :src="image" max-width="150px">
        </div>        

        <span v-for="(error,index) in errors" :key="index">
          <v-alert dense text type="error">{{error[0]}} </v-alert> 
        </span>

        <v-alert v-if="signedUp" dense text type="success">Account succefully created</v-alert>

        <v-form ref="form" v-model="valid">
          <v-text-field label="الاسم" color="accent" v-model= "form.name" :rules="[v => !!v || 'الإسم مطلوب']" ></v-text-field>
          
          <v-text-field label="الإيميل" color="accent" v-model= "form.email" :rules="[v => !!v || 'الإيميل مطلوب', v => /.+@.+\..+/.test(v) || 'الايميل لابد يكون صحيح']" ></v-text-field>

          <v-text-field label="كلمة السر" color="accent" type="password" v-model= "form.password" :rules="[v => !!v || 'كلمة السر مطلوبة']" ></v-text-field>

            <v-text-field label="تأكيد كلمة السر" color="accent" type="password" v-model= "form.password_confirmation" :rules="[v => !!v || 'التاكيد مطلوب']" ></v-text-field>

            <v-btn type = "submit" @click.prevent= "submit" color="primary"  class= "mt-6" elevation=0 :disabled="!valid">
                  سجل
            </v-btn>

        </v-form>  
    </v-card>
    </v-col>
    </v-container>

</template>

<script>
import axios from 'axios';
import img from '../../assets/logo.png'
axios.defaults.baseURL ='https://limitless-journey-59964.herokuapp.com/'

export default {
    data(){
        return {
            valid:true,
            tab :null,
            signedUp: false,
            form:{
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors:[],
            image:img,
        }
    },
    methods: {
        submit(){
            this.$refs.form.validate()

            axios.post('/api/register', this.form).then(() =>{
                console.log('saved');
                this.signedUp = true;
            }).catch((error) =>{
                this.errors = error.response.data.errors;
            })
        }
    }
}
</script>

<style>

</style>

        