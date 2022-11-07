export function request(URL){
	uni.addInterceptor('request',{
		invoke(args) {
			args.url = URL+args.url
		}
	})
	
	uni.addInterceptor('uploadFile',{
		invoke(args) {
			args.url = URL+args.url
		}
	})
}