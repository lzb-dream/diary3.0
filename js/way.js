export function copy(obj) {
        if (typeof obj !== 'object' || obj ===null){
            return obj
        }
        let result
        if (obj instanceof Array){
            result = []
        }else {
            result = {}
        }
        for (const key in obj) {
            result[key] = copy(obj[key])
        }
        return result
}

export async function requests(obj){
	const res = await uni.request({
		url:obj.url,
		data:obj.data,
		method:obj.method
	})
	return res
}

export async function uploadfile(obj){
	const res = await uni.uploadFile({
		url:obj.url,
		filePath:obj.filePath,
		formData:obj.formData,
		name:obj.name
	})
	return res
}
