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
		<button class="exit" @click="exit">退出</button>
		<button class="editor" @click="popupOpen">编辑</button>
		<button class="customerService" open-type="contact">客服</button>
	</view>

	<uni-popup ref="popup" type="bottom" :is-mask-click="false">
		<view class="editorView">
			<view class="editorView-item">
				<text>昵称:</text>
				<input type="text" v-model="$store.state.userInfo.nickName" focus maxlength="10" placeholder="请输入你的昵称">
			</view>
			
			<view class="editorView-item">
				<text>头像:</text>
				<image :src="$store.state.userInfo.headPortrait" mode="aspectFill" @click="changeHeadPortrait"></image>
			</view>
			<view class="editorView-item">
				<text>地址:</text>
				<input type="text" placeholder="请输入你的默认地址" v-model="$store.state.record.address">
			</view>
			<view class="editorView-item">
				<button type="default" @click="popupClose">取消</button>
				<button type="primary" @click="editorSave">保存</button>
			</view>
		</view>
	</uni-popup>
	
	<view class="list">
		<uni-segmented-control :current="current" :values="items" active-color="#6da6be" @clickItem="onClickItem($event)" />
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
	import { nextTick, onMounted,ref,inject, watch, onBeforeUpdate } from "vue"
	const myStore = useStore()
	const userInfo = myStore.state.userInfo
	const items = ['我写的日记', '喜欢的日记', '分享的日记']
	let current=ref(0)
	let imageSave = false
	let oldImage = myStore.state.userInfo.headPortrait
	let nickNameSave= false
	let oldNickName = myStore.state.userInfo.nickName
	const popup = ref(null)
	let userId = myStore.state.userInfo.id
	if(myStore.state.hasLogin){
		myStore.dispatch('my/getDiary',userId)
	}
	watch(()=>myStore.state.hasLogin,(nv)=>{
		if (nv===true){
			let userId = myStore.state.userInfo.id
			myStore.dispatch('my/getDiary',userId)
		}
	})
	function onClickItem(e){
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex
		}
	}
	watch(()=>userInfo.nickName,(nv,ov)=>{
		console.log(nv);
		nickNameSave = true
	})
	async function changeHeadPortrait(){
		const res = await uni.chooseImage()
		if(res.errMsg==="chooseImage:ok"){
			myStore.commit('changeUserInfo',{headPortrait:res.tempFilePaths[0]})
			imageSave = true
			console.log(res.tempFilePaths[0]);
		}
	}
	function popupOpen(){
		popup.value.open('bottom')
	}
	function popupClose(){
		myStore.commit('changeUserInfo',{nickName:oldNickName,headPortrait:oldImage})
		popup.value.close()
	}
	function exit(){
		uni.showModal({
			title:'你确定要退出登录吗？',
			success: res => {
				if(res.confirm){
					uni.removeStorageSync('userInfo')
					uni.removeStorageSync('address')
					myStore.commit('outLogin')
				} 
			}
		})

	}
	function editorSave(){
		console.log(imageSave);
		let addTime = Date.now()
		let storage = null
		if (imageSave){
			uni.uploadFile({
				url:'userManagement',
				filePath:userInfo.headPortrait,
				fileType: 'image',
				name:userInfo.openId+String(addTime),
				formData:{openId:userInfo.openId,addTime:addTime,identify:'image'},
				success: res => {
				imageSave = false
				if (res.statusCode===200){
					storage = uni.getStorageSync('userInfo')
					storage.headPortrait = userInfo.headPortrait
					uni.setStorageSync('userInfo',storage)
				}else {
					uni.showModal({
						title:'头像保存失败'
					})
				}
				console.log(res);
				}
				
		})
		} 
		if (nickNameSave) {
			uni.request({
				url:'userManagement',
				method:"POST",
				data:{openId:userInfo.openId,addTime:addTime,nickName:userInfo.nickName,identify:'nickName'},
				success: res => {
					nickNameSave = false
					if (res.statusCode===200){
						storage = uni.getStorageSync('userInfo')
						storage.nickName = userInfo.nickName
						uni.setStorageSync('userInfo',storage)
					}else {
					uni.showModal({
						title:'昵称保存失败'
					})
				}
				}
			})
		}
		popup.value.close()
		
	}
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
						uni.request({
							url: 'userManagement',
							data: {
								js_code: res.code,
								headPortrait: headPortrait,
								nickName: nickname,
								addTime: addTime
							},
							method: 'GET',
							dataType: JSON,
							timeout:6000,
							success: res => {
								if (res.statusCode < 200 || res.statusCode > 226) {
									uni.showModal({
										title: '后端请求失败'
									})
									return false
								} else {
									console.log(res);
									const userInfo = JSON.parse(res.data)
									console.log(userInfo);
									myStore.commit('login', userInfo)
								}
							},
							fail: res => {
								console.log(res);
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
			background-image: linear-gradient(to bottom right, rgba(247, 240, 172, 0.62), rgba(172, 247, 240, 0.77), rgba(240, 172, 247, 0.75));
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
			filter: blur(40rpx);
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
			right: 5rpx;
			top: 5rpx;
			font-size: xx-small;
			background-color: transparent;
		}
		.exit {
			position: absolute;
			left: 5rpx;
			top: 5rpx;
			height: 50rpx;
			margin: 0;
			padding: 0 10rpx;
			text-align: center;
			font-size: small;
			line-height: 50rpx;
			background-color: transparent;
		}
		.customerService {
			position: absolute;
			right: 5rpx;
			bottom: 5rpx;
			height: 50rpx;
			margin: 0;
			padding: 0 10rpx;
			text-align: center;
			font-size: small;
			line-height: 50rpx;
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
