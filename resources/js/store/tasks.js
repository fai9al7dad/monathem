import axios from "axios"

export default {
	namespaced: true,
	state: {
		todo_tasks:[],
		doing_tasks:[],
		done_tasks: []
	},
	getters:{
		todo_tasks(state){
			return state.todo_tasks
		},
		doing_tasks(state){
			return state.doing_tasks
		},
		done_tasks(state){
			return state.done_tasks
		}
	},
    mutations: {
		ADD_TASK(state,value){
			state.todo_tasks.push(value)
		},
		
		GET_DOING_TASKS(state,value){
			state.doing_tasks.push(value)
		},
		GET_DONE_TASKS(state,value){
			state.done_tasks.push(value)
		},

		DELETE_TODO_TASK(state,value){
			state.todo_tasks = state.todo_tasks.filter((todo) => todo.id != value)
		},
		DELETE_DOING_TASK(state,value){
			state.doing_tasks = state.doing_tasks.filter((todo) => todo.id != value)
		},
		DELETE_DONE_TASK(state,value){
			state.done_tasks = state.done_tasks.filter((todo) => todo.id != value)
		},

		CHANGE_STATUS(state,value){
			if(value.nstatus == 'doing'){
				if(value.ostatus == 'todo'){
					state.todo_tasks = state.todo_tasks.filter((todo) => todo.id != value.body.id)
					state.doing_tasks.push(value.body)					
				}
				else if (value.ostatus == 'done'){
					state.done_tasks = state.done_tasks.filter((todo) => todo.id != value.body.id)
					state.doing_tasks.push(value.body)					
				}
			}
			else if (value.nstatus == 'done'){
				if (value.ostatus == 'doing'){
					state.doing_tasks = state.doing_tasks.filter((todo) => todo.id != value.body.id)
					state.done_tasks.push(value.body)
				}
				else if (value.ostatus == 'todo'){
					state.todo_tasks = state.todo_tasks.filter((todo) => todo.id != value.body.id)
					state.done_tasks.push(value.body)

				}
			}
			else{
				if (value.ostatus == 'doing'){
					state.doing_tasks = state.doing_tasks.filter((todo) => todo.id != value.body.id)
					state.todo_tasks.push(value.body)
				}
				else if (value.ostatus == 'done'){
					state.done_tasks = state.done_tasks.filter((todo) => todo.id != value.body.id)
					state.todo_tasks.push(value.body)					
				}
			}
		},
		SET_DUE_DATE(state,value){
			for(let i =0; i<state.todo_tasks.length; i++){
				if (state.todo_tasks[i].id ==  value[0].id){
					state.todo_tasks[i] = value[0]
				}
			}
			console.log(value);
		},
		DELETE_DUE_DATE(state,value){
			for(let i =0; i<state.todo_tasks.length; i++){
				if (state.todo_tasks[i].id ==  value.id){
					state.todo_tasks[i].due_date = null
				}
			}
			
		}

    },

	actions: {
		async addTask({commit,state}, credentials){
           axios.post('/api/tasks', credentials).then(res => {
			   commit('ADD_TASK',res.data)
		   });

		},
		getTodoTasks({commit,state},credentials){
			state.todo_tasks = [];
            axios.get('api/tasks/' + credentials + '/' + 'todo').then((res)=>{
				for(let i =0; i< res.data.length; i++){
					commit('ADD_TASK', res.data[i])
				}					
            })
        },
		getDoingTasks({commit,state},credentials){
			state.doing_tasks = [];
            axios.get('api/tasks/' + credentials + '/' + 'doing').then((res)=>{
				for(let i =0; i< res.data.length; i++){
					commit('GET_DOING_TASKS', res.data[i])
				}					
            })
        },
		getDoneTasks({commit,state},credentials){
			state.done_tasks = [];
            axios.get('api/tasks/' + credentials + '/' + 'done').then((res)=>{
				for(let i =0; i< res.data.length; i++){
					commit('GET_DONE_TASKS', res.data[i])
				}					
            })
        },
		async deleteTask(credentials){
			await axios.delete('/api/tasks/' + credentials.id)
		},
		async deleteTodoTask({commit}, credentials){
			await axios.delete('/api/tasks/' + credentials.id)
			commit('DELETE_TODO_TASK', credentials.id)
		},
		async deleteDoingTask({commit}, credentials){
			await axios.delete('/api/tasks/' + credentials.id)
			commit('DELETE_DOING_TASK', credentials.id)
		},
		async deleteDoneTask({commit}, credentials){
			await axios.delete('/api/tasks/' + credentials.id)
			commit('DELETE_DONE_TASK', credentials.id)
		},

		async changeStatus({commit}, credentials){
			const res = await axios.post('api/changetaskstatus' + "/" + credentials.id + "/" + credentials.ostatus + "/" + credentials.nstatus) ;

			commit('CHANGE_STATUS', {body: res.data[0], ostatus: res.data[1], nstatus: res.data[2]})
		},

		async setDueDate({commit}, credentials){
			const res = await axios.post('/api/setduedate/'+ credentials.task.id + "/" + credentials.date);
			commit('SET_DUE_DATE', res.data)
		},
		async deleteDueDate({commit},credentials){
			const res = await axios.post('/api/deleteduedate/'+ credentials.task.id);
			commit('DELETE_DUE_DATE', res.data)
		},
		async markDone({commit}, credentials){
			const res = await axios.post('api/changetaskstatus' + "/" + credentials.id + "/" + credentials.status + "/" + 'done') 
			commit('CHANGE_STATUS', {body: res.data[0], ostatus: res.data[1], nstatus: 'done'})
		}


	}
}