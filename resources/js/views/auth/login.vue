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
 
    <v-card
        rounded
        class="px-10 py-10"
        
        >
        <div class="d-flex justify-center mb-6">
            <img :src="image" max-width="150px">
        </div>
        <span v-for="(error,index) in errors" :key="index">
          <v-alert dense text type="error">{{error[0]}} </v-alert> 
        </span>

        <v-form ref="form" v-model="valid">
            <v-text-field
            label="الإيميل"
            color="accent"
            v-model= "form.email"
            :rules="[v => !!v]"
            ></v-text-field> 

             <v-text-field
            label="كلمة السر"
            color="accent"
            type="password"
            v-model= "form.password"
            :rules="[v => !!v]"
            ></v-text-field> 

            <v-btn type = "submit" @click.prevent= "submit" color="primary"  class= "mt-6" elevation=0 :disabled="!valid">
                سجل
            </v-btn> 

        </v-form>  
    </v-card>
    </v-col>
    </v-container>

</template>

<script>
import { mapActions } from 'vuex';
import img from '../../assets/logo.png'

export default {
    data(){
        return {
            tab :null,
            valid: true,
            form:{
                email: '',
                password: '',
            },
            errors:[],
            image:img,
        }
    },
    methods: {
        ...mapActions({
            signIn: 'auth/signIn'

        }),
        async submit(){
            this.$refs.form.validate();
            await this.signIn(this.form);
            this.$router.push('/dashboard')

        }
    }
}
</script>

<style scoped>

</style>