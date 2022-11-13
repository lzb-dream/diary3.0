export default {
	namespaced:true,
	state:{
		id:'',
		writeTime:'',
		
		weather:'',
		mood:'',
		address:'',
		video:[],
		videoPhoto:[],
		image:[],
		diary:'',
		
		editor:false,
		
		getUserInfo:false,
		
		oldWeather:'',
		oldMood:'',
		oldAddress:'',
		oldVideo:[],
		oldVideoPhoto:[],
		oldImage:[],
		oldDiary:'',
		
		updateData:{},
		
		newVideo:[],
		newImage:[],
		newVideoPhoto:[],
		
		deleteImage:[],
		deleteVideo:[],
		deleteVideoPhoto:[],

	},
	getters:{
		
	},
	mutations:{
		changeState(state,obj){
			state[obj.name] = obj.value
		},
		pushList(state,obj){
			state[obj.name].push(obj.value)
		},
		popList(state,obj){
			// if(obj.name==='image'){
				
			// 	state.image[obj.index].indexOf('http://127.0.0.1:8000/')
			// }
			console.log(state);
			state[obj.name].splice(obj.index,1)
		},
		updateData(state,obj){
			state['updateData'][obj.name]=obj.value
		},
		putList(state,obj){
			console.log('我是putList');
			state[obj.name].length = 0
			for (let key in obj.value) {
				state[obj.name][key] = obj.value[key]
			}
			console.log(obj.name ,state[obj.name]);
		}
		
	},
	actions:{
		
	}
}