import {createStore} from 'vuex'
import record from '@/store/record'
const store = createStore({
	state: {
		hasLogin:false,
		userInfo:{}
	},
	mutations: {
		changeUserInfo(state,object){
			for (let key in object) {
				state.userInfo[key] = object[key]
			}
			console.log(state.userInfo);
		},
		login(state,info){
			state.userInfo=info
			state.hasLogin = true
			uni.setStorageSync('userInfo',info)
		},
		getUserInfo(state){
			let userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				state.userInfo = userInfo
				state.hasLogin = true
			}else{
				state.hasLogin = false
			}
		},
		outLogin(state){
			
		},
	},
	getters:{},
	actions: {

	},
	modules:{
		record
	}
})
export default store
