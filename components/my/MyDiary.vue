<template>
	<view class="Box">
		<view class="item" v-for="(i,index) in $store.state.my.diarys" :key="index" :style="styleVideoPhoto(i)"
		@click="checkDiary(i)">
			<text>{{i.writeTime.split('T')[0]}}</text>
			<view v-if="diaryJudeg(i)">{{diaryAbstract(i)}}</view>
		</view>
	</view>
</template>

<script setup>
import {useStore} from 'vuex'
import { computed, onMounted, watch } from "vue";
const myStore = useStore()
// 日记封面样式
function styleVideoPhoto(i){
	if(i.image.length>0){
		return `background-image:url(${i.image[0]})`
	}else if(i.videoPhoto.length>0){
		return `background-image:url(${i.videoPhoto[0]})`
	}else{
		return `background:	#e9ca9e`
	}
}

// 日记简单描述用于没有封面的日记
function diaryAbstract(i){
	let r = i.diary.substr(0,50)
	if (i.diary.length>r.length){
		return r+'. . .'
	}else{
		return r
	}
}
// 日记是否有封面判断
function diaryJudeg(i){
	if (i.image>0){
		return false
	} 
	else if(i.videoPhoto>0){
		return false
	} 
	else{
		return true
	} 
}
// 点击日记并给日记赋值
function checkDiary(i){
	myStore.commit('readDiary/changeState',{name:'weather',value:i.weather})
	myStore.commit('readDiary/changeState',{name:'mood',value:i.mood})
	myStore.commit('readDiary/changeState',{name:'writeTime',value:i.writeTime})
	myStore.commit('readDiary/changeState',{name:'diary',value:i.diary})
	myStore.commit('readDiary/changeState',{name:'address',value:i.address})
	myStore.commit('readDiary/changeState',{name:'id',value:i.id})

	myStore.commit('readDiary/changeState',{name:'image',value:i.image})
	myStore.commit('readDiary/changeState',{name:'video',value:i.video})
	myStore.commit('readDiary/changeState',{name:'videoPhoto',value:i.videoPhoto})
	uni.navigateTo({
		url:'/pages/readDiary/readDiary',
		success: () => {
			console.log(myStore.state.readDiary);
		}
	})
}

</script>

<style scoped lang="less">
	.Box {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;
		.item {
			width: 33.33%;
			height: 300rpx;
			border: 3rpx solid white;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-size: cover;
			text-align: center;
			color: aliceblue;
			text {
				display: inline-block;
				margin-top: 5rpx;
				color: #ffffff;
			}
			view {
				width: 90%;
				margin: 0 auto;
				font-size: small;
				margin-top: 10rpx;
			}
		}
	}
</style>