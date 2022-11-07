import {createStore} from 'vuex'
import record from '@/store/record'
import my from '@/store/my'
import readDiary from '@/store/readDiary'
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
			state.hasLogin=false
			state.userInfo={}
		},
	},
	getters:{},
	actions: {

	},
	modules:{
		record,
		my,
		readDiary
	}
})
export default store
