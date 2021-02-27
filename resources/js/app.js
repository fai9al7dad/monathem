import VueRouter from 'vue-router';
import App from './views/App';
import login from './views/auth/login';
import register from './views/auth/register';
import PageNotFound from './views/auth/pageNotFound';
import account from './views/auth/account';
import dashboard from './views/dashboard';
import project from './views/project';
import storeData from "./store/index";
import schedule from './views/schedule';
import vuetify from './vuetify';
import Vuex from 'vuex'


require('./bootstrap');
window.Vue = require('vue').default;
;
Vue.use(VueRouter)
Vue.use(Vuex)


const store = new Vuex.Store(
    storeData
)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
       
        {
            path: '/login',
            name: 'login',
            component: login,
         
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard,
            beforeEnter: (to,from,next) => {
                axios.get('/api/auth').then(()=>{
                    next();
                }).catch(()=>{
                    return next('/login');
                })
            }
        },
        {
            path: '/account',
            name: 'account',
            component: account,
            beforeEnter: (to,from,next) => {
                axios.get('/api/auth').then(()=>{
                    next();
                }).catch(()=>{
                    return next('/login');
                })
            }
        },
        {
            path: '/project/:id',
            name: 'project',
            component: project,
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: schedule,
        },
        {
            path: "*",
            component: PageNotFound
        }
    ],
});

store.dispatch('auth/me').then(() => {
    const app = new Vue({
        el: '#app',
        render: h => h(App),
        components: {
            App,
        },
        router,
        vuetify,
        store
    })
});
