<template>
	<view class="heard">
		<view class="rtitle">
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
				<input type="text" v-model="$store.state.record.address" placeholder="">
				<view class="choose_address">
					<uni-icons type="location-filled" size="30" @click="getAddress" color="#cc86d1"></uni-icons>
				</view>
			</view>
		</view>
		<view class="example-body">
			<uni-datetime-picker type="datetime" v-model="$store.state.record.addTime" @change="changeLog" />
		</view>
		<FilePicker></FilePicker>
		<button class="save" v-if="$store.state.record.diary" @click="save">保存</button>
	</view>
	
	<textarea name="" id="" placeholder="写已写今天都发生了什么吧₍˄·͈༝·͈˄*₎◞ " maxlength="-1"
	v-model="diary" auto-height="true"></textarea>


</template>

<script setup>
	import FilePicker from '@/components/FilePicker.vue'
	import {ref,onMounted,inject,watch,onBeforeMount} from 'vue'
	import {useStore} from 'vuex'
	const myStore = useStore()
	let	statusBarHeight = inject('statusBarHeight') * 2 + 'rpx',
		diary = ref(null),
		weather = ref(myStore.state.record.weatherList[0]),
		mood = ref(myStore.state.record.moodList[0]),
		index = ref(0)
		
		

// 获取选择的心情与天气
	function getWeather_Mood(e,type) {
		if (type==="weather"){
			weather.value = myStore.state.record.weatherList[e.detail.value]
			myStore.commit('record/changeState',{name:'weather',value:weather.value})
		}else if(type==="mood"){
			mood.value = myStore.state.record.moodList[e.detail.value]
			myStore.commit('record/changeState',{name:'mood',value:mood.value})
		}
	}
	
//获取用户的地址 
	async function getAddress(){	
		const ad = await uni.chooseLocation()
		console.log(ad);
		myStore.commit('record/changeState',{name:'address',value:ad.name})
	}
//对日记进行校验 
	function diaryDispose(value) {
		// trim不会改变原本字符串会生成一个新的字符串，用于去除字符串前后空格
		let test = value.trim();
		return test
	}
	onBeforeMount(()=>{
		myStore.commit('record/changeState',{name:'weather',value:weather.value})
		myStore.commit('record/changeState',{name:'mood',value:mood.value})
	})
	
	onMounted(() => {
		myStore.commit('record/changeState',{name:'addTime',value:Date.now()})
		console.log(myStore.state.record);
	})
	watch(diary,(nv)=>{
		let diary = diaryDispose(nv)
		myStore.commit('record/changeState',{name:'diary',value:diary})
		console.log(myStore.state.record.diary);
	})
	async function saveDiary(diaryData,writeTime){
		const diaryRes = await uni.request({
								url:'diary',
								data:{
									diary:diaryData.diary,
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
	
	async function saveImage(imageUrl,diaryId,writeTime,logo,i){
		let name = i+myStore.state.userInfo.openId+''+writeTime
		const imageRes = await uni.uploadFile({
			url:'imageManagement',
			filePath:imageUrl,
			fileType:'image',
			name:name,
			formData:{diaryId:diaryId, name:name, openId:myStore.state.userInfo.openId,logo:logo,writeTime:writeTime}
		})
		return imageRes
	}
	async function saveVideo(videoUrl,diaryId,writeTime,logo,i){
		let name = i+myStore.state.userInfo.openId+''+writeTime
		const videoRes = await uni.uploadFile({
			url:'videoManagement',
			filePath:videoUrl,
			fileType:'video',
			name:name,
			formData:{diaryId:diaryId, name:name, openId:myStore.state.userInfo.openId,logo:logo,writeTime:writeTime}
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
		let writeTime = new Date(diaryData.addTime).getTime()
		if (saveSwitch){
			// saveSwitch = false
			const diaryRes = await saveDiary(diaryData,writeTime)	
			console.log(diaryRes);
			let diaryId = diaryRes.data.diaryId
			console.log(diaryId);
			if (diaryData.imageList){
				for (var i = 0; i < diaryData.imageList.length; i++) {
				 	const imageRes =  await saveImage(diaryData.imageList[i],diaryId,writeTime,'create',i)
					console.log(imageRes);
				}
			}
			if (diaryData.videoList){
				for (var i = 0; i < diaryData.videoList.length; i++) {
					const videoRes =  await saveVideo(diaryData.videoList[i],diaryId,writeTime,'create',i)
					console.log(videoRes);
				}
			}
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
		}

		.weather-mood {
			width: 95%;
			display: flex;
			margin: 0 auto;
			margin-top: 40rpx;
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
		// border-radius: 10rpx;
		padding: 10rpx;
	}
</style>
