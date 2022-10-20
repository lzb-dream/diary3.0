<template>
	<WeatherAndAddress @diaryFocus="diaryFocus"></WeatherAndAddress>
	<button class="save" v-if="diary" ref="a">保存</button>

</template>

<script setup>
	import WeatherAndAddress from '@/components/WeatherAndAddress.vue'
	import {
		onMounted,
		ref
	} from "vue";
	let diary = ref('')
	const a = ref(null)
	onMounted(()=>{
		console.log(a.value);
	})
	function diaryFocus(value) {
		// trim不会改变原本字符串会生成一个新的字符串，用于去除字符串前后空格
		let test = value.value.trim();
		if (test == null || test == '' || test == undefined) return false;
		diary.value = value.value
	}
</script>

<style scoped lang="less">
	.save {
		position: fixed;
		bottom: 0;
		background-image: linear-gradient(to right, pink, yellow);
		width: 100%;
		z-index: 999;
	}
</style>
