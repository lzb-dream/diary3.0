 export default {
	namespaced:true,
	state: {
		weatherList:['晴朗','多云','雨天','下雪'],
		moodList:['开心','生气','委屈'],
		imageList:[],
		videoList:[],
		videoPhoto:[],
		weather:'',
		mood:'',
		address:'',
		diary:'',
		addTime:''
	},
	mutations: {
		changeState(state,obj){
			state[obj.name] = obj.value
		},
		pushList(state,obj){
			state[obj.name].push(obj.value)
		},
		popList(state,obj){
			state[obj.name].pop(obj.index)
		},
		emptyList(state,name){
			state[name].length = 0
		}
	},
	getters:{
		diaryDispose(state) {
			// trim不会改变原本字符串会生成一个新的字符串，用于去除字符串前后空格
			let test = state.diary.trim();
			return test
		}
	},
	actions: {
	
	},
}