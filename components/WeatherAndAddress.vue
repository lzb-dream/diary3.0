<template>
	<view class="heard">
		<view class="rtitle" v-if="operationType=='save'">
			<text>记录点点滴滴</text>
		</view>
		<view class="weather-mood">
			<view class="boxweather">
				<text class="tag">天气：</text>
				<view class="weather">
					<input type="text" v-model="weather" maxlength="5">
					<picker mode="selector" :range="$store.state.record.weatherList" @change="getWeather_Mood($event,'weather')">
						<uni-icons type="bottom" size="30" color="gray"></uni-icons>
					</picker>
				</view>
			</view>

			<view class="boxmood">
				<text class="tag">心情：</text>
				<view class="mood">
					<input type="text" v-model="mood" maxlength="5">
					<picker mode="selector" :range="$store.state.record.moodList" @change="getWeather_Mood($event,'mood')">
						<uni-icons type="bottom" size="30" color="gray"></uni-icons>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="boxaddress">
			<text>地址：</text>
			<view class="address">
				<input type="text" v-model="address" placeholder="请输入地址">
				<view class="choose_address">
					<uni-icons type="location-filled" size="30" @click="getAddress" color="#cc86d1"></uni-icons>
				</view>
			</view>
		</view>
		<view class="example-body" v-if="operationType!=='editor'">
			<uni-datetime-picker type="datetime" v-model="$store.state.record.addTime"/>
		</view>
		<FilePicker title="如需上传图片视频请点击" :deleteInco="true"  :operationType="operationType" backgroundColor="#dcffbd" ></FilePicker>
		<button class="save" v-if="$store.state.record.diary&&operationType==='save'" @click="save">保存</button>
		<button class="save" v-if="$store.state.readDiary.diary&&operationType==='editor'" @click="update">更改</button>
	</view>
	
	<textarea name="" placeholder="写已写今天都发生了什么吧₍˄·͈༝·͈˄*₎◞ " maxlength="-1"
	v-model="diary" @focus="focus"></textarea>


</template>

<script setup>
	import FilePicker from '@/components/FilePicker.vue'
	import {ref,onMounted,inject,watch,onBeforeMount,reactive} from 'vue'
	import {useStore} from 'vuex'
	import {copy} from '@/js/way.js'
	const props = defineProps(['operationType'])
	const myStore = useStore()

	let	statusBarHeight = inject('statusBarHeight') * 2 + 'rpx',
		weather = ref(myStore.state.record.weatherList[0]),
		mood = ref(myStore.state.record.moodList[0]),
		address = ref(myStore.state.record.address),
		diary = ref(myStore.state.record.diary),
		imageList = reactive(myStore.state.record.imageList),
		videoList = reactive(myStore.state.record.videoList),
		operationType = props.operationType,
		
		oldImage = null,
		oldVideo = null,
		oldVideoPhoto = null,
		newImage = myStore.state.readDiary.newImage,
		newVideo = myStore.state.readDiary.newVideo,
		newVideoPhoto = myStore.state.readDiary.newVideoPhoto,
		index = ref(0);	
	
	onBeforeMount(()=>{
		// 编辑模式下的默认值
		if(operationType==='editor'){
			statusBarHeight=0
			weather.value = myStore.state.readDiary.weather
			mood.value = myStore.state.readDiary.mood
			address.value = myStore.state.readDiary.address
			diary.value = myStore.state.readDiary.diary
			imageList = reactive(myStore.state.readDiary.image)
			videoList = reactive(myStore.state.readDiary.video)
			
			oldImage = copy(myStore.state.readDiary.image)
			oldVideo = copy(myStore.state.readDiary.video)
			oldVideoPhoto = copy(myStore.state.readDiary.videoPhoto)
		}else if(operationType==='save'){
			// 天气心情默认值
			myStore.commit('record/changeState',{name:'weather',value:weather.value})
			myStore.commit('record/changeState',{name:'mood',value:mood.value})
		}
	})
	onMounted(() => {
		myStore.commit('record/changeState',{name:'addTime',value:Date.now()})
	})
	//监听天气
	watch(weather,(nv)=>{
		if(operationType==='editor'){
			console.log(12345643213245465);
			myStore.commit('readDiary/changeState',{name:'weather',value:nv})
			myStore.commit('readDiary/updateData',{name:'weather',value:nv})
			console.log(123456789);
		}else if(operationType==='save'){
			myStore.commit('record/changeState',{name:'weather',value:nv})
		}
	})
	// 监听心情
	watch(mood,(nv)=>{
		if(operationType==='editor'){
			myStore.commit('readDiary/changeState',{name:'mood',value:nv})
			myStore.commit('readDiary/changeState',{name:'mood',value:nv})
			myStore.commit('readDiary/updateData',{name:'mood',value:nv})
		}else if(operationType==='save'){
			myStore.commit('record/changeState',{name:'mood',value:nv})
		}
	})
	// 监听地址
	watch(address,(nv)=>{
		if(operationType==='editor'){
			myStore.commit('readDiary/changeState',{name:'address',value:nv})
			myStore.commit('readDiary/updateData',{name:'address',value:nv})
		}else if(operationType==='save'){
			myStore.commit('record/changeState',{name:'address',value:nv})
		}
	})
	// 监听日记
	watch(diary,(nv)=>{
		if(operationType==='editor'){
			myStore.commit('readDiary/changeState',{name:'diary',value:nv})
			myStore.commit('readDiary/updateData',{name:'diary',value:nv})
		}else if(operationType==='save'){
			myStore.commit('record/changeState',{name:'diary',value:nv})
		}
	})
	function focus(){
		if (!myStore.state.hasLogin){
			uni.showModal({
				title:'请登录后使用',
				success: res => {
					if(res.confirm){
						uni.switchTab({
							url:'/pages/my/my'
						})
					}
				}
			})
		}
	}
	
	function update(){
		console.log(myStore.state.readDiary.updateData);
		console.log(newImage);
		console.log(newVideo);
		console.log(newVideoPhoto);
		
		console.log(oldImage);
		console.log(oldVideo);
		console.log(oldVideoPhoto);
		let updateTime = new Date().getTime()
		console.log(updateTime);
		if(myStore.state.readDiary.updateData!=={}){
			uni.request({
				url:'diary',
				method:'PUT',
				data:{id:myStore.state.readDiary.id,data:myStore.state.readDiary.updateData,updateTime:updateTime},
				success: res => {
					console.log(res);
				}
			})
		}

		if(newImage.length>0){
			for (var i = 0; i < newImage.length; i++) {
				let name = i+myStore.state.userInfo.openId+''+updateTime
				let image = JSON.stringify(myStore.state.readDiary.image) 
				uni.uploadFile({
					url:'updateImage',
					fileType:'image',
					filePath:newImage[i],
					formData:{newImage:JSON.stringify(newImage),ImageList:image,updateTime:updateTime,id:myStore.state.readDiary.id,name:name},
					name:name
				})
			}
		}
		if(newVideo.length>0){
			for (var i = 0; i < newVideo.length; i++) {
				let name = i+myStore.state.userInfo.openId+''+updateTime
				let videoList = JSON.stringify(myStore.state.readDiary.video) 
				uni.uploadFile({
					url:'updateVideo',
					fileType:'video',
					filePath:newVideo[i],
					formData:{newVideo:JSON.stringify(newVideo),videoList:videoList,updateTime:updateTime,id:myStore.state.readDiary.id,name:name},
					name:name
				})
			}
			for (var i = 0; i < newVideoPhoto.length; i++) {
				let name = i+myStore.state.userInfo.openId+''+updateTime
				let videoPhotoList = JSON.stringify(myStore.state.readDiary.videoPhoto) 
				uni.uploadFile({
					url:'updateVideo',
					fileType:'image',
					filePath:newVideoPhoto[i],
					formData:{newVideoPhoto:JSON.stringify(newVideoPhoto),videoPhotoList:videoPhotoList,updateTime:updateTime,id:myStore.state.readDiary.id,name:name},
					name:name
				})
			}
		}
	}
	
// 获取选择的心情与天气
	function getWeather_Mood(e,type) {
		if (type==="weather"){
			weather.value = myStore.state.record.weatherList[e.detail.value]
		}else if(type==="mood"){
			mood.value = myStore.state.record.moodList[e.detail.value]
		}
	}
	
//获取用户的地址 
	async function getAddress(){	
		const ad = await uni.chooseLocation()
		address.value = ad.name
	}

	async function saveDiary(diaryData,writeTime){
		const diaryRes = await uni.request({
								url:'diary',
								data:{
									diary:myStore.getters['record/diaryDispose'],
									writeTime:writeTime,
									mood:diaryData.mood,
									weather:diaryData.weather,
									address:diaryData.address,
									openId:myStore.state.userInfo.openId
								},
								method:"POST"
							})
		return diaryRes
	}
	
	async function saveImage(imageUrl,diaryId,writeTime,i){
		let name = i+myStore.state.userInfo.openId+''+writeTime
		const imageRes = await uni.uploadFile({
			url:'imageManagement',
			filePath:imageUrl,
			fileType:'image',
			name:name,
			formData:{diaryId:diaryId, name:name, openId:myStore.state.userInfo.openId,writeTime:writeTime}
		})
		return imageRes
	}
	
	async function saveVideo(videoUrl,diaryId,writeTime,i){
		let name = i+myStore.state.userInfo.openId+''+writeTime
		const videoRes = await uni.uploadFile({
			url:'videoManagement',
			filePath:videoUrl,
			fileType:'video',
			name:name,
			formData:{diaryId:diaryId, name:name, openId:myStore.state.userInfo.openId,writeTime:writeTime}
		})
		return videoRes
	}
	
	async function saveVideoPhoto(videoPhotoUrl,diaryId,writeTime,i){
		let name = i+myStore.state.userInfo.openId+''+writeTime
		const videoRes = await uni.uploadFile({
			url:'videoPhotoManagement',
			filePath:videoPhotoUrl,
			fileType:'image',
			name:name,
			formData:{diaryId:diaryId, name:name, openId:myStore.state.userInfo.openId,writeTime:writeTime}
		})
		return videoRes
	}
	
	let saveSwitch = true
	async function save(){
		let ad = uni.getStorageSync('address')
		if (ad!==myStore.state.record.address){
			uni.showModal({
				title:'是否将地址保存为默认地址',
				success:res=>{
					if(res.confirm){
						uni.setStorageSync('address',myStore.state.record.address)
					}
				}
			}) 
		}
		const diaryData = myStore.state.record
		if (!myStore.getters['record/diaryDispose']){
			uni.showToast({
				title:'日记为空',
				icon:'error'
			})
			return false
		}
		let writeTime = new Date(diaryData.addTime).getTime()
		if (saveSwitch){
			saveSwitch = false
			setTimeout(()=>{
				saveSwitch = true
			},6000)
			const diaryRes = await saveDiary(diaryData,writeTime)
			if (diaryRes.statusCode===500){
				uni.showToast({
					title:'日记保存失败',
					icon:'error',
				})
			}
			console.log(diaryRes);
			let diaryId = diaryRes.data.diaryId
			console.log(diaryId);
			if (diaryData.imageList){
				for (var i = 0; i < diaryData.imageList.length; i++) {
				 	const imageRes =  await saveImage(diaryData.imageList[i],diaryId,writeTime,'create',i)
					if (imageRes.statusCode === 500){
						uni.showToast({
							title:'图片保存失败',
							icon:'error'
						})
						return false
					} 
					console.log(imageRes);
				}
			}
			if (diaryData.videoList){
				for (var i = 0; i < diaryData.videoList.length; i++) {
					const videoRes =  await saveVideo(diaryData.videoList[i],diaryId,writeTime,i)
					if (videoRes.statusCode===500){
						uni.showToast({
							title:'视频保存失败',
							icon:'error'
						})
						return false
					}
					console.log(videoRes);
				}
				for (var i = 0; i < diaryData.videoPhoto.length; i++) {
					const videoPhotoRes =  await saveVideoPhoto(diaryData.videoPhoto[i],diaryId,writeTime,i)
					if (videoPhotoRes.statusCode===500){
						uni.showToast({
							title:'视频封面保存失败',
							icon:'error'
						})
						return false
					}
					console.log(videoPhotoRes);
				}
				
			}
			
			uni.showToast({
				title:'日记保存成功',
				icon:'success'
			})
			let userId = myStore.state.userInfo.id
			myStore.dispatch('my/getDiary',userId)
			myStore.commit('record/changeState',{name:'diary',value:''})
			myStore.commit('record/emptyList','imageList')
			myStore.commit('record/emptyList','videoList')
			diary.value=''
		}else{
			console.log(saveSwitch);
		}
	}
</script>

<style lang="less" scoped>
	.heard {
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 999;
		padding-top: v-bind(statusBarHeight);
		margin-bottom: 20rpx;
		.rtitle {
			text-align: center;
			margin-bottom: 40rpx;
		}

		.weather-mood {
			width: 95%;
			display: flex;
			margin: 0 auto;
			.boxweather,.boxmood{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50%;
				.tag {
					display: inline-block;
					margin-left: 10rpx;
				}
				.weather,.mood {
					width: 65%;
					display: flex;
					align-items: center;
					border: 1px solid gray;
					border-radius: 20rpx;
					input {
						width: 65%;
						height: 80rpx;
						padding: 0 10rpx;
						text-align: center;
						font-size: small;
					}
					picker {
						width: 10%;
					}
				}
			}
		}
		
		.boxaddress {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 95%;
			margin: 0 auto;
			margin-bottom: 10rpx;
			.address {
				width: 85%;
				height: 80rpx;
				margin: 0 auto;
				margin-top: 20rpx;
				display: flex;
				justify-content: center;
				border: 1px solid gray;
				border-radius: 20rpx;
				
				input {
					width: 90%;
					height: 100%;
					font-size: small;
					padding: 0 10rpx;
					text-align: center;
				}
				.choose_address {
					margin: auto 0;
				}
			}
		}
	}
	.save {
		background-image: linear-gradient(to right, pink, yellow);
		width: 100%;
	}

	textarea {
		margin: 0 auto;
		width: 92%;
		line-height: 45rpx;
		// line-height: 50rpx;
		border-radius: 10rpx;
		padding: 10rpx;
		height: 1000rpx;

	}
</style>

<style>
	page {
		background-color: #fae0b2;
	}
</style>