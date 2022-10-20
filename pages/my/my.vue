<template>
	<view class="login" v-if="!$store.state.hasLogin">
		<button type="default" @click="login">微信一键登录</button>
	</view>
	
	<view class="head">
		<view class="headPortrait" :style="`background-image:url(${myStore.state.userInfo.headPortrait})`"></view>
		<view class="headNickname">
			<text>{{$store.state.userInfo.nickName}}</text>
			<image :src="$store.state.userInfo.headPortrait" mode="aspectFill"></image>
		</view>

		<view class="tag" >
			<text>获赞：{{$store.state.userInfo.praise}}</text>
			<text>小花：{{$store.state.userInfo.flowers}}</text>
		</view>
		<button class="editor" @click="popupOpen">编辑</button>
	</view>

	<uni-popup ref="popup" type="bottom" :is-mask-click="false">
		<view class="editorView">
			<view class="editorView-item">
				<text>昵称：</text>
				<input type="text" v-model="$store.state.userInfo.nickName" focus >
			</view>
			
			<view class="editorView-item">
				<text>头像:</text>
				<image :src="$store.state.userInfo.headPortrait" mode="aspectFill" @click="changeHeadPortrait"></image>
			</view>
			<view class="editorView-item">
				<button type="default" @click="popupClose">取消</button>
				<button type="primary">保存</button>
			</view>
		</view>
	</uni-popup>
	
	<view class="list">
		<uni-segmented-control :current="current" :values="items" active-color="#6da6be" @clickItem="onClickItem" />
		<view class="content">
			<view v-if="current === 0"><MyDiary></MyDiary></view>
			<view v-if="current === 1"><LoveDiary></LoveDiary></view>
			<view v-if="current === 2"><ShareDiary></ShareDiary></view>
		</view>
	</view>
</template>

<script setup>
	
	import {time} from '@/js/time.js'
	import {useStore} from 'vuex'
	import MyDiary from '@/components/my/MyDiary.vue'
	import LoveDiary from '@/components/my/LoveDiary.vue'
	import ShareDiary from '@/components/my/ShareDiary.vue'
	import { nextTick, onMounted,ref,inject } from "vue"
	const url = inject('URL')
	const myStore = useStore()
	const items = ['我写的日记', '喜欢的日记', '分享的日记']
	let current=0
	const popup = ref(null)
	const editorNickName = myStore.state.userInfo.nickName
	
	async function changeHeadPortrait(){
		const res = await uni.chooseImage()
		if(res.errMsg==="chooseImage:ok"){
			myStore.commit('changeUserInfo',{headPortrait:res.tempFilePaths[0]})
			console.log(res.tempFilePaths[0]);
		}
	}
	function popupOpen(){
		popup.value.open('bottom')
	}
	function popupClose(){
		popup.value.close()
	}
	function editorSave(){
		uni.uploadFile({
			
		})
	}
	onMounted(()=>{

	})
	
	function login() {
		let headPortrait,
			nickname,
			addTime;
		uni.getUserProfile({
			desc: '用于用户登录',
			success: res => {
				headPortrait = res.userInfo.avatarUrl
				nickname = res.userInfo.nickName
				addTime = Date.now()
				console.log(addTime, time(addTime));
				uni.login({
					success: res => {
						let js_code = res.code
						uni.request({
							url: url,
							data: {
								js_code: js_code,
								headPortrait: headPortrait,
								nickName: nickname,
								addTime: addTime
							},
							method: 'GET',
							dataType: JSON,
							success: res => {
								if (res.statusCode < 200 || res.statusCode > 226) {
									uni.showModal({
										title: '后端请求失败'
									})
									return false
								} else {
									console.log(res);
									const userInfo = JSON.parse(res.data)
									console.log();
									myStore.commit('login', userInfo)
								}
							},
							fail: () => {
								uni.showModal({
									title: '发送请求失败'
								})
							}
						})
					}
				})
			}
		})
	}
	
	
</script>

<style scoped lang="less">
	.login {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-image: url('http://127.0.0.1:8000/static/myBackground.png');
		background-size: cover;
		button {
			position: absolute;
			height: 90rpx;
			top: 90%;
			left: 50%;
			transform: translate(-50%,-50%);
			background: transparent;
			background-image: linear-gradient(to bottom right, rgba(220, 255, 189, 0.58), rgba(255, 240, 245, 0.73));
			//有特殊效果
			// background-position: -50rpx;
		}
	}
	.head {
		width: 100%;
		height: 380rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		.headPortrait {
			position: absolute;
			width: 100%;
			height: 100%;
			background-size:100% 100%;
			filter: blur(30rpx);
			z-index: -1;
		}
		.headNickname {
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				box-shadow:1px 1px 2px #a5a5a5;
			}
		}

		.tag {
			width: 100%;
			position: absolute;
			bottom: 2%;
			display: flex;
			justify-content: space-around;
		}
		.editor {
			position: absolute;
			right: 0;
			top: 0;
			font-size: xx-small;
			background-color: transparent;
		}
	}
	
	.editorView {
		width: 100%;
		height: 735rpx;
		background-color: aliceblue;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.editorView-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 100rpx;
			input {
				color: #868686;
				text-align: right;
			}
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 20rpx;
			}
			button {
				margin: 0;
			}
		}
	}
</style>
