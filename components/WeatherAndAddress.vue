<template>
	<view class="heard">
		<view class="rtitle">
			<text>记录点点滴滴</text>
		</view>
		<view class="weather-mood">
			<view class="weather">
				<input type="text" v-model="weather">
				<picker mode="selector" :range="weatherList" @change="getWeather_Mood($event,'weather')">12</picker>
			</view>
			<view class="mood">
				<input type="text" v-model="mood">
				<picker mode="selector" :range="moodList" @change="getWeather_Mood($event,'mood')">12</picker>
			</view>
		</view>
		
		<view class="address">
			<input type="text" v-model="address" style="font-size: x-small;">
			<uni-icons type="location-filled" size="30" @click="getAddress"></uni-icons>
		</view>

		<view class="example-body">
			<uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" />
		</view>
		<FilePicker></FilePicker>
	</view>
	<textarea name="" id="" cols="30" rows="10" placeholder="写已写今天都发生了什么吧₍˄·͈༝·͈˄*₎◞ " maxlength="-1"
		v-model="diary"></textarea>

</template>

<script setup>
	import FilePicker from '@/components/FilePicker.vue'
	import {
		ref,
		onMounted,
		inject,
		watch
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	let emits = defineEmits(['diaryFocus']),
		statusBarHeight = inject('statusBarHeight') * 2 + 'rpx',
		datetimesingle = ref(null),
		diary = ref(null),
		
		weather = ref(null),
		mood = ref(null),
		index = ref(0),
		
		address = ref(null);
		
	const myStore = useStore(),
		weatherList = myStore.state.record.weatherList,
		moodList = myStore.state.record.moodList;

	function getWeather_Mood(e,type) {
		if (type==="weather"){
			weather.value = weatherList[e.detail.value]
		}else if(type==="mood"){
			mood.value = moodList[e.detail.value]
		}
	}
	async function getAddress(){
		const ad = await uni.chooseLocation()
		try{
			address.value = ad.address.split('市')[1]+ad.name
		}catch{
			address.value = ad.name
		}
	}
	onMounted(() => {
		datetimesingle.value = Date.now() - 2 * 24 * 3600 * 1000
		console.log(datetimesingle.value);
	})
	watch(diary, () => {
		emits('diaryFocus', diary)
	})
	watch(mood, (nv) => {
		console.log(nv);
	})
</script>

<style lang="less" scoped>
	input {
		width: 80%;
		height: 80rpx;
		border: 1px solid gray;
	}
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
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 40rpx;

			.weather,.mood {
				width: 50%;
				display: flex;
				
				picker {
					width: 20%;
				}
			}

		}
		.address {
			width: 100%;
			height: 80rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			
		}

	}

	textarea {
		margin: 0 auto;
		width: 92%;
		height: 550rpx;
		line-height: 50rpx;
		box-shadow: 0px 0px 36rpx 0px rgba(5, 5, 5, 0.15);
		border-radius: 10rpx;
		padding: 10rpx;
	}
</style>
