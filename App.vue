<script>
import {provide} from "vue"
	export default {
		onLaunch: function() {
			uni.setTabBarBadge({
				index: 1,
				text: '1'
			})
			this.$store.commit('getUserInfo')
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			console.log(statusBarHeight);
			provide('statusBarHeight',statusBarHeight)
			provide('URL','http://127.0.0.1:8000/')
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
