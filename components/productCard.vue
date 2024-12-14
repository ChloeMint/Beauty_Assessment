<template>
	<view>
		<image class="productImage" :src="image" mode="aspectFill"></image>
		<text class="title">{{name}}</text>
		<view class="tagView">
			<text v-for="tag in tags">{{tag}}</text>
		</view>
		<view class="starBox">
			<image src="../static/星星（黄）.png" v-for="starCount in fullStar(score)"></image>
			<image src="../static/半星.png" v-if="shouldShowHalfStar(score)" style="width: 38rpx; height: 38rpx;"></image>
			<image src="../static/星星.png" v-for="emptyCount in emptyStar(score)"></image>
		</view>
		<text class="score">{{score.toFixed(1)}}</text>
		<text class="endTime">{{endTime}}</text>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue';  
	const { image,name,tags,score,endTime } = defineProps({
			image: String ,
			name:String,
			tags:Array,
			score:Number,
			endTime:String
	})
	
	function fullStar(score) {
		return Math.floor(score)
	}
	
	function shouldShowHalfStar(score) {
		return score % 1 === 0.5
	}
	
	function emptyStar(score) {
		return 5 - fullStar(score) - (shouldShowHalfStar(score) ? 1 : 0);
	}
	
	
	
</script>

<style scoped>
	.productImage {
		width: 80px;
		height: 80px;
		position: absolute;
		left: 10px;
		top: 10px;
		border-radius: 5px;
	}
	
	.title {
		position: absolute;
		left: 110px;
		top: 10px;
		font-size: 13px;
	}
	
	.tagView {
		position: absolute;
		left: 110px;
		top: 33px;
		width: auto;
		height: 20px;
		font-size: 10px;
		color: red;
	}
	
	.tagView text {
		padding-left: 5px;
		padding-right: 5px;
		display: inline-block;
		width: auto;
		line-height: 20px;
		text-align: center;
		margin-right: 10px;
		border-radius: 5px;
		border: 1px solid #FFB3B9;
	}
	
	.starBox {
		position: absolute;
		bottom: 10px;
		left: 110px;
		width: 110px;
		height: 20px;
	}
	
	.starBox image {
		width: 20px;
		height: 20px;
	}
	
	.endTime {
		position: absolute;
		color: #BFBFBF;
		font-size: 13px;
		top: 10px;
		right: 10px;
	}
	
	.score {
		position: absolute;
		color: #FF9D51;
		font-size: 13px;
		bottom: 11.5px;
		left: 220px;
	}
</style>