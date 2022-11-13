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
