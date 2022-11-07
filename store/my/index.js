export default {
	namespaced:true,
	state:{
		diarys:[]
	},
	getters:{

	},
	mutations:{
		changeState(state,obj){
			state[obj.name] = obj.value
		},
	},
	actions: {
		// 用户id
		async getDiary(context,userId){
			console.log(userId);
			const diaryRes = await uni.request({
				url:'diary',
				data:{userId:userId},
				method:"GET",
			})
			console.log(diaryRes);
			const diarys = diaryRes.data.diarys
			console.log( typeof diarys);
			diarys.forEach((item)=>{
				if(item.video){
					item.video =  JSON.parse(item.video)
					item.video.forEach((items,index)=>{
						item.video[index]='http://127.0.0.1:8000/'+items
					})
					item.videoPhoto = JSON.parse(item.videoPhoto)
					item.videoPhoto.forEach((items,index)=>{
						item.videoPhoto[index]='http://127.0.0.1:8000/'+items
					})
				}
				if(item.image){
					item.image =  JSON.parse(item.image)
					item.image.forEach((items,index)=>{
						item.image[index]='http://127.0.0.1:8000/'+items
					})
				}
			})
			console.log(diarys);
			context.commit('changeState',{name:'diarys',value:diarys})
		}
	},
}