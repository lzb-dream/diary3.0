<script>
import {provide} from "vue"
import {request} from "@/js/interceptor.js"
	export default {
		onLaunch: function() {
			let URL = 'http://127.0.0.1:8000/'
			// 请求拦截器
			request(URL)
			
			uni.setTabBarBadge({
				index: 1,
				text: '1'
			})
			this.$store.commit('getUserInfo')
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			console.log(statusBarHeight);
			provide('statusBarHeight',statusBarHeight)
			let address = uni.getStorageSync('address')
			if(address){
				this.$store.commit('record/changeState',{name:'address',value:address})
			}
		},
		onShow: function() {
			
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
