 export default {
	namespaced:true,
	state: {
		weatherList:['晴朗','多云','雨天','下雪'],
		moodList:['开心','生气','委屈'],
		imageList:[],
		videoList:[],
		weather:'',
		mood:'',
		address:'',
		diary:'',
		addTime:''
	},
	mutations: {
		changeState(state,obj){
			state[obj.name] = obj.value
		}
	},
	getters:{
		// weather(state){
		// 	return function(v){
		// 		console.log(v);
		// 		return state.weatherList[0]
		// 	}
		// },
	},
	actions: {
	
	},
}