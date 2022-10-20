<template>
	<uni-collapse-item title="如上传视频与照片请点击这里">
		<view class="content">
			<view class="Media">

				<view class="itemMedia" v-for="(i,index) in imageList" :key="i">
					<image :src="i" alt="" @click="previewImage()" mode="aspectFill"></image>
					<text class="incorrect" @click.stop="close(index,'image')"></text>
				</view>

				<view class="itemMedia" v-for="(i,index) in videoList" :key="i">
					<video :src="i" controls @click="previewVideo()"></video>
					<text class="incorrect" @click.stop="close(index,'video')"></text>
				</view>

				<view class="addMedia" @click="choose">
					<uni-icons type="plusempty" size="65" color="darkgray"></uni-icons>
				</view>

			</view>
		</view>
	</uni-collapse-item>


</template>

<script setup>
	import {
		reactive
	} from "vue";
	const imageList = reactive([])
	const videoList = reactive([])
	async function choose() {
		let res = await uni.chooseMedia()
		console.log(res);
		if (res.errMsg === "chooseMedia:ok") {
			for (var i = 0; i < res.tempFiles.length; i++) {
				if (res.type === "video") {
					videoList.push(res.tempFiles[i].tempFilePath)
				} else if (res.type === "image") {
					imageList.push(res.tempFiles[i].tempFilePath)
				}
				console.log(imageList, videoList);
			}
		}
	}

	function previewVideo() {
		console.log('父親');
	}

	function close(index,type) {
		if(type==="image"){
			imageList.pop(index)
			console.log('照片');
		}else if(type==="video"){
			videoList.pop(index)
			console.log('视频');
		}
		console.log(index);
	}
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
		}
	}
</style>
