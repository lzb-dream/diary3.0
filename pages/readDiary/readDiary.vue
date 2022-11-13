<template>
	<uni-nav-bar dark :fixed="true" shadow background-color="#fae0b2" color="black" status-bar left-icon="left" left-text="返回"
		title="这里是我的回忆" @clickLeft="back" />
	<view class="Box" v-if="!readDiary.editor">
		<text class="textTime">{{readDiary.writeTime.replace('T',' ')}}</text>
		<text class="textAddress">地址：{{readDiary.address}}</text>
		<view class="textWeatherMood">
			<text>天气：{{readDiary.weather}}</text>
			<text>心情：{{readDiary.mood}}</text>
		</view>
		<FilePicker title="图片或视频" backgroundColor="#fae0b2" v-if="mide()" :deleteInco="false"></FilePicker>
		<text class="textDiary">{{readDiary.diary}}</text>
		<button class="editor" @click="editor" v-if="!readDiary.editor">编辑</button>
	</view>
	<template v-if="readDiary.editor">
		<WeatherAndAddress operationType="editor"></WeatherAndAddress>
	</template>
	
</template>

<script setup>
import WeatherAndAddress from '@/components/WeatherAndAddress.vue'
import FilePicker from '@/components/FilePicker.vue'
import {copy} from '@/js/way.js'
import {useStore} from 'vuex'
import { onBeforeMount, watch } from "vue";
const myStore = useStore()
const readDiary = myStore.state.readDiary
console.log(readDiary);
onBeforeMount(()=>{
	console.log(readDiary);
	myStore.commit('readDiary/changeState',{name:'oldWeather',value:readDiary.weather})
	myStore.commit('readDiary/changeState',{name:'oldMood',value:readDiary.mood})
	myStore.commit('readDiary/changeState',{name:'oldAddress',value:readDiary.address})
	myStore.commit('readDiary/changeState',{name:'oldVideo',value: copy(readDiary.video)})
	myStore.commit('readDiary/changeState',{name:'oldVideoPhoto',value:copy(readDiary.videoPhoto)})
	myStore.commit('readDiary/changeState',{name:'oldImage',value:copy(readDiary.image)})
	myStore.commit('readDiary/changeState',{name:'oldDiary',value:readDiary.diary})
	console.log('oldVideo', readDiary.oldVideo);
})
watch(readDiary.video,(nv)=>{
	console.log('监听',nv);
})
// 图片与视频显示
function mide(){
	if (readDiary.image||readDiary.video){
		return true
	} 
	else {
		return false
	}
 }
 
// 编辑日记
async function editor(){
 	const res = await uni.showModal({
		title:'确定要编辑当前日记吗？'
	})
	if(res.confirm){
		myStore.commit('readDiary/changeState',{name:'editor',value:true})
	}
 }
 
 // 导航栏返回
 function back(){
	if(!readDiary.getUserInfo){
		myStore.commit('readDiary/changeState',{name:'weather',value:readDiary.oldWeather})
		myStore.commit('readDiary/changeState',{name:'mood',value:readDiary.oldMood})
		myStore.commit('readDiary/changeState',{name:'address',value:readDiary.oldAddress})
		myStore.commit('readDiary/changeState',{name:'diary',value:readDiary.oldDiary})
		
		myStore.commit('readDiary/putList',{name:'video',value:readDiary.oldVideo})
		myStore.commit('readDiary/putList',{name:'videoPhoto',value:readDiary.oldVideoPhoto})
		myStore.commit('readDiary/putList',{name:'image',value:readDiary.oldImage})
		
		console.log(readDiary);
	}
	
	uni.switchTab({
		url:'/pages/my/my',
		success: () => {
			myStore.commit('readDiary/changeState',{name:'editor',value:false})
		}
	})
 }
</script>

<style scoped lang="less">
	.Box{
		display: flex;
		flex-direction: column;
		width: 100%;
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
		.textEditorDiary {
			width: 95%;
			display: inline-block;
			padding: 17rpx;
			line-height: 60rpx;
			margin: 0 auto;
			width: 95%;
			height: 800rpx;
		}
		.textDiary {
			padding: 17rpx;
			line-height: 60rpx;
		}
		.editor {
			background-color:transparent;
			position: absolute;
			bottom: 0;
			right: 50%;
			transform: translateX(50%);
			color: #757575;
		}
	}
</style>

<style>
	/* 单页面的颜色设置 */
	page {
		background-color: #fae0b2;
	}
</style>