import axios from "axios";
axios.defaults.baseURL ='https://limitless-journey-59964.herokuapp.com/'

export default {
    namespaced: true,
	state: {
        authenticated: false,
        user: null,
        errors:[]
    },

    getters: {
        authenticated (state) {
            return state.authenticated
        },

        user (state) {
            return state.user
        },

    },

    mutations: {
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },

        SET_USER (state, value) {
            state.user = value
        },


    },
    actions: {
        async signIn({dispatch}, credentials){
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/login', credentials)

            return dispatch('me');
        },
        async me({commit}){
            return axios.get('/api/user').then((res) => {
                commit('SET_AUTHENTICATED',true);
                commit ('SET_USER',res.data);
            }).catch(()=> {
                commit('SET_AUTHENTICATED',false);
                commit ('SET_USER', null);
            }
        )},

        async signOut ({ dispatch }) {
            await axios.post('api/logout')
      
            return dispatch('me')
          },
    
    },


}