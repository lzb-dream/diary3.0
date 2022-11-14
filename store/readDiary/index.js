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
		
		// 进入编辑状态进行编辑内容保存副本
		oldWeather:'',
		oldMood:'',
		oldAddress:'',
		oldVideo:[],
		oldVideoPhoto:[],
		oldImage:[],
		oldDiary:'',
		
		// 收集被编辑的内容只有日记，心情，天气，地址
		updateData:{},
		
		// 收集添加的视频与图片
		newVideo:[],
		newImage:[],
		newVideoPhoto:[],
		
		// 收集被删除的视频与图片链接
		deleteImage:[],
		deleteVideo:[],
		deleteVideoPhoto:[],
		
		// 总域名
		URl:''

	},
	getters:{
		getUrl(state, getters, rootState, rootGetters){
			console.log(rootState);
		}
	},
	mutations:{
		changeState(state,obj){
			state[obj.name] = obj.value
		},
		
		pushList(state,obj){
			state[obj.name].push(obj.value)
		},
		
		popList(state,obj){
			if(obj.name==='image'||obj.name==='video'||obj.name==='videoPhoto'){
				let num =  state[obj.name][obj.index].indexOf('http://127.0.0.1:8000/')
				if(num>-1){
					switch(obj.name){
						case 'image':
							state.deleteImage.push(obj.value)
							break;
						case 'video':
							state.deleteVideo.push(obj.value)
							break;
						case 'VideoPhoto':
							state.deleteVideoPhoto.push(obj.value)
					}
				}
			}
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
		},
		
		empty(state,listName){
			state[listName].length = 0
		}
		
		
	},
	actions:{
		getUrl(context){
			context.commit('changeState',{name:'URL',value:context.rootState.URL})
		}
	}
}