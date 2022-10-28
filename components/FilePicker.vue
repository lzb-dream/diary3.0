<template>
	<uni-collapse>
		<uni-collapse-item title="如上传视频与照片请点击这里">
			<view class="Media">
		
				<view class="itemMedia" v-for="(i,index) in imageList" :key="i">
					<image :src="i" alt="" @click="previewImage(i)" mode="aspectFill"></image>
					<text class="incorrect" @click.stop="close(index,'image')"></text>
				</view>
		
				<view class="itemMedia" v-for="(i,index) in videoList" :key="i" @click.stop="previewVideo(i)">
					<video :src="i" controls  :show-fullscreen-btn="false" :show-center-play-btn="false" :controls="false"></video>
					<text class="incorrect" @click.stop="close(index,'video')"></text>
					<view class="play">
						<uni-icons type="videocam" size="35" color="#00F5FF"></uni-icons>
					</view>
				</view>
		
				<view class="addMedia" @click="choose">
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
			imageList:reactive([]),
			videoList:reactive([]),
			videoplay: false,
			videoUrl: "",
			myStore:useStore()
		}
	},
	onReady: function () {
	    this.videoContext = uni.createVideoContext("myvideo", this);    // this这个是实例对象  必传
	},
	methods:{
		choose:async function() {
			let res = await uni.chooseMedia()
			if (res.errMsg === "chooseMedia:ok") {
				for (var i = 0; i < res.tempFiles.length; i++) {
					if (res.type === "video") {
						this.videoList.push(res.tempFiles[i].tempFilePath)
						this.myStore.commit('record/changeState',{name:'videoList',value:this.videoList})
					} else if (res.type === "image") {
						this.imageList.push(res.tempFiles[i].tempFilePath)
						this.myStore.commit('record/changeState',{name:'imageList',value:this.imageList})
					}
				}
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
		close :function (index,type) {
			if(type==="image"){
				this.imageList.pop(index)
				console.log('照片');
			}else if(type==="video"){
				this.videoList.pop(index)
				console.log('视频');
			}
			console.log(index);
		},
		screenChange(e) {
		      let fullScreen = e.detail.fullScreen; //值true为进入全屏，false为退出全屏
		      console.log(e, "qweeee========================================");
		      if (!fullScreen) {
		        //退出全屏
		        this.videoplay = false;   // 隐藏播放盒子
		      }
		    }
		
	}
}
	
	// const imageList = reactive([])
	// const videoList = reactive([])
	// async function choose() {
	// 	let res = await uni.chooseMedia()
	// 	if (res.errMsg === "chooseMedia:ok") {
	// 		for (var i = 0; i < res.tempFiles.length; i++) {
	// 			if (res.type === "video") {
	// 				videoList.push(res.tempFiles[i].tempFilePath)
	// 			} else if (res.type === "image") {
	// 				imageList.push(res.tempFiles[i].tempFilePath)
	// 			}
	// 		}
	// 	}
	// }

	// function previewVideo(videoId) {
	// 	let videoContext = uni.createVideoContext('popup_video', this);
	// 	this.videoContext.requestFullScreen();
	// 	console.log(video);
	// }
	// function previewImage(imageUrl){
	// 	uni.previewImage({
	// 		urls:[imageUrl]
	// 	})
	// }

	// function close(index,type) {
	// 	if(type==="image"){
	// 		imageList.pop(index)
	// 		console.log('照片');
	// 	}else if(type==="video"){
	// 		videoList.pop(index)
	// 		console.log('视频');
	// 	}
	// 	console.log(index);
	// }
	
</script>
<style lang="less" scoped>
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
