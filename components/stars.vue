<template>
	<view>
		<image src="../../static/星星（黄）.png" v-for="starCount in fullStar(score)"></image>
		<image src="../../static/半星.png" v-if="shouldShowHalfStar(score)"></image>
		<image src="../../static/星星.png" v-for="emptyCount in emptyStar(score)"></image>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue';  
	
	// const props = defineProps({  // 全写
	//   score: Number  
	// }); 
	const { score } = defineProps({ score: Number })
	
	function fullStar(score){
		return Math.floor(score)
	}
	
	function shouldShowHalfStar(score){
		return score % 1 === 0.5
	}
	
	function emptyStar(score){
		return 5 - fullStar(score) - (shouldShowHalfStar(score) ? 1 : 0); 
	}
</script>

<style scoped>	
	image{
		width: 20px;
		height: 20px;
	}
</style>