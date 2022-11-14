<template>
	<uni-collapse>
		<uni-collapse-item :title="title" thumb="http://127.0.0.1:8000/static/inco/picture.png" :open="$store.state.readDiary.editor">
			<view class="Media">
				<view class="itemMedia" v-for="(i,index) in operationType==='save'?$store.state.record.imageList:$store.state.readDiary.image" :key="i">
					<image :src="i" alt="" @click="previewImage(i)" mode="aspectFill"></image>
					<text class="incorrect" @click.stop="deleteImage(index)" v-if="deleteInco"></text>
				</view>
		
				<view class="itemMedia" v-for="(i,index) in operationType==='save'?$store.state.record.videoList:$store.state.readDiary.video" :key="i" @click.stop="previewVideo(i)">
					<video :src="i" controls  :show-fullscreen-btn="false" :show-center-play-btn="false" :controls="false"></video>
					<text class="incorrect" @click.stop="deleteVideo(index)" v-if="deleteInco"></text>
					<view class="play">
						<uni-icons type="videocam" size="35" color="#00F5FF"></uni-icons>
					</view>
				</view>
		
				<view class="addMedia" @click="choose" v-if="deleteInco">
					<uni-icons type="plusempty" size="45" color="darkgray"></uni-icons>
				</view>
			</view>
		</uni-collapse-item>
	</uni-collapse>
	<video v-if="videoplay" controls id="myvideo" :src="videoUrl" @fullscreenchange="screenChange"></video>

</template>

<script>
import {reactive} from "vue";
import {useStore} from 'vuex'
export default {
	data(){
		return {
			videoplay: false,
			videoUrl: "",
			myStore:useStore(),
		}
	},
	props:{
		title:String,
		deleteInco:Boolean,
		backgroundColor:String,
		operationType:String
	},
	onReady: function () {
	    this.videoContext = uni.createVideoContext("myvideo", this);    // this这个是实例对象  必传
	},
	methods:{
		// 选择图片或者视频
		choose:async function() {
			if (this.myStore.state.record.videoList.length+this.myStore.state.record.imageList.length>=6){
				uni.showModal({
					title:'视频图片数量不能大于6个'
				})
				return false
			}
			let res = await uni.chooseMedia()
			console.log(res);
			console.log(this.$store.state.readDiary);
			if (res.errMsg === "chooseMedia:ok") {
				for (var i = 0; i < res.tempFiles.length; i++) {
					if (res.type === "video") {
						if (res.tempFiles[i].size/1048576>=10){
							uni.showModal({
								title:'单个视频不能大于10mb'
							})
							return false
						} 
						if (this.operationType==='save'){
							this.myStore.commit('record/pushList',{name:'videoList',value:res.tempFiles[i].tempFilePath})
							this.myStore.commit('record/pushList',{name:'videoPhoto',value:res.tempFiles[i].thumbTempFilePath})
						}else if(this.operationType==='editor'){
							this.myStore.commit('readDiary/pushList',{name:'video',value:res.tempFiles[i].tempFilePath})
							this.myStore.commit('readDiary/pushList',{name:'videoPhoto',value:res.tempFiles[i].thumbTempFilePath})
							this.myStore.commit('readDiary/pushList',{name:'newVideo',value:res.tempFiles[i].tempFilePath})
							this.myStore.commit('readDiary/pushList',{name:'newVideoPhoto',value:res.tempFiles[i].thumbTempFilePath})
						}
					} else if (res.type === "image") {
						if (this.operationType==='save'){
							this.myStore.commit('record/pushList',{name:'imageList',value:res.tempFiles[i].tempFilePath})
						}else if(this.operationType==='editor'){
							this.myStore.commit('readDiary/pushList',{name:'image',value:res.tempFiles[i].tempFilePath})
							this.myStore.commit('readDiary/pushList',{name:'newImage',value:res.tempFiles[i].tempFilePath})
						}
						
					}
				}
			}
		},
		
		deleteVideo: function (index){
			if (this.operationType==='save'){
				this.$store.commit('record/popList',{name:'videoList', index:index})
				this.$store.commit('record/popList',{name:'videoPhoto', index:index})
			}else if(this.operationType==='editor'){
				this.$store.commit('readDiary/popList',{name:'video', index:index})
				this.$store.commit('readDiary/popList',{name:'videoPhoto', index:index})
			}
		},
		deleteImage: function(index){
			if (this.operationType==='save'){
				this.$store.commit('record/popList',{name:'imageList', index:index})
			}else if(this.operationType==='editor'){
				this.$store.commit('readDiary/popList',{name:'image', index:index})
			}
		},
		
		previewVideo: function (videoUrl) {
			this.videoUrl =videoUrl;
			this.videoContext.requestFullScreen();  //direction: 90  这个是控制全屏的时候视屏旋转多少度 
			this.videoContext.play();
			this.videoplay = true;
		},
		previewImage: function (imageUrl){
			uni.previewImage({
				urls:[imageUrl]
			})
		},


		screenChange(e) {
		      let fullScreen = e.detail.fullScreen; //值true为进入全屏，false为退出全屏
		      console.log(e, "qweeee========================================");
		      if (!fullScreen) {
		        //退出全屏
		        this.videoplay = false;   // 隐藏播放盒子
		      }
		    }
		
	},
	options: {
		styleIsolation: 'shared'
	}
}
	
	
</script>

<script setup>
const props = defineProps(['backgroundColor','operationType'])
let backgroundColor = props.backgroundColor
let operationType = props.operationType
</script>
<style lang="less" scoped>
/deep/ .uni-collapse-item__title-box {
		background-color: v-bind(backgroundColor);
	}
/deep/ .uni-collapse-item__title {
		background-color: v-bind(backgroundColor);
	}
	button {
		width: 200rpx;
		height: auto;
		font-size: small;
		background-image: linear-gradient(to right, #dcffbd, #cc86d1);
	}
	.Media {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		background-color: #ffffdb;
		.itemMedia {
			position: relative;
			width: 150rpx;
			height: 150rpx;
			margin: 10rpx;
			box-shadow: 0px 0px 36rpx 0px rgba(5, 5, 5, 0.15);
			image,
			video {
				width: 100%;
				height: 100%;
				border-radius: 15rpx;
			}
			.incorrect {
				width: 35rpx;
				height: 35rpx;
				display: inline-block;
				background-image: url('../static/incorrect .png');
				background-size: 100% 100%;
				position: absolute;
				top: 10rpx;
				right: 10rpx;
			}
			.play {
				z-index: 99;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.addMedia {
			width: 150rpx;
			height: 150rpx;
			margin: 10rpx;
			border: 5px solid darkgray;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 12rpx;
			box-sizing: border-box;
			z-index: 99;
			
		}
	}
</style>