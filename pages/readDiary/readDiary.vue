<template>
	<view class="Box">
		<text class="textTime">{{readDiary.writeTime.replace('T',' ')}}</text>
		<text class="textAddress">地址：{{readDiary.address}}</text>
		<view class="textWeatherMood">
			<text>天气：{{readDiary.weather}}</text>
			<text>心情：{{readDiary.mood}}</text>
		</view>
		<FilePicker title="图片或视频" :imageList="$store.state.readDiary.image" :videoList="$store.state.readDiary.video" :deleteInco="false" backgroundColor="#FFE4B5" v-if="mide()"></FilePicker>
		<text class="textDiary">{{$store.state.readDiary.diary}}</text>
	</view>
</template>

<script setup>
import FilePicker from '@/components/FilePicker.vue'
import {useStore} from 'vuex'
const myStore = useStore()
const readDiary = myStore.state.readDiary
console.log(readDiary);
function mide(){
	if (readDiary.image||readDiary.video){
		return true
	} 
	else {
		return false
	}
 }
</script>

<style scoped lang="less">
	.Box{
		display: flex;
		flex-direction: column;
		.textTime {
			display: inline-block;
			font-size: large;
			margin: 0 auto;
			margin-top: 10rpx;
		}
		.textWeatherMood {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-around;
			
		}
		.textAddress {
			display: inline-block;
			margin: 0 auto;
			margin-top: 16rpx;
		}
		.textDiary {
			display: inline-block;
			padding: 17rpx;
			line-height: 60rpx;
		}
	}
</style>

<style>
	/* 单页面的颜色设置 */
	page {
		background-color: #FFE4B5;
	}
</style>