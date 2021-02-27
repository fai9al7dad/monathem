import axios from "axios";
import { castArray } from "lodash";

export default {
    namespaced: true,


	state: {
        projects: [],
        project:{}
	},

	getters: {
        projects(state){
            return state.projects;
        },
        project(state){
            return state.project
        }
    },

    mutations: {
        GET_PROJECTS(state,value){
            state.projects = value
        },
        ADD_PROJECT(state,value){
            state.projects.push(value)
        },

        GET_PROJECT(state,value){
            state.project = value[0];
        },
        DELETE_PROJECT(state,value){
			state.projects = state.projects.filter((project) => project.id != value.id)
        },
        CHANGE_COLOR(state,value){
            state.project.color = value
        }
       
    },

	actions: {
        getProjects({commit, rootState}){
            if(rootState.auth.authenticated){
                axios.get('api/projects').then((res)=>{
                    commit ('GET_PROJECTS', res.data);
                })
            }
        },
        async addProject({commit}, credentials){
            try{
                const color= '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                credentials['color'] = color
                const res = await axios.post('/api/projects', credentials);
                commit('ADD_PROJECT', res.data)
            }
            catch(error){
                const color= '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                credentials['color'] = color
                const res = await axios.post('/api/projects', credentials);
                commit('ADD_PROJECT', res.data)
            }
            
          },

          //get indivual project based on params
        getProject({commit}, id){
            axios.get('api/project/' + id).then((res)=>{
                commit('GET_PROJECT', res.data);
            })
        },

        async deleteProject({commit}, id){
            const res = await axios.delete('/api/deleteproject/' + id);
            commit('DELETE_PROJECT',res.data)

        },
        async changeProjectColor({commit}, credentials){
            let project = credentials.project;
            project['new_color'] = credentials.color
            const res = await axios.post('/api/changeprojectcolor', project );
            commit('CHANGE_COLOR',res.data)
        }
       
	},

}