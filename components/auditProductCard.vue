<template>
	<view class="item">
		<image :src="image" mode="aspectFill"></image>
		<view class="itemInfo">
			<view class="title">
				<view><text>{{name}}</text></view>
				<text class="passTitle" v-if="status == 1">已通过</text>
				<text class="notPassTitle" v-if="status == 0">未通过</text>
			</view>
			<view class="itemContent">
				<text>{{content}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue';
	
	const props = defineProps({ 
	  image: String,
	  name:String,
	  status:Number,
	  content:String
	}); 
</script>

<style scoped>
	.item{
		margin-bottom: 40rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		border: 2rpx solid #f0f0f0;
		width: calc(100% - 48rpx);
		height: 150rpx;
		border-radius: 10rpx;
		box-shadow: 4rpx 4rpx 10rpx #F0F0F0;
	}
	
	.item>image{
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}
	
	.item .itemInfo{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		width: calc(100% - 170rpx);
		height: 100%;
	}
	
	.item .itemInfo .title{
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: auto;
	}
	
	.item .itemInfo .title view{
		margin-right: 20rpx;
		overflow: hidden; /* 隐藏超出容器的文本 */  
		text-overflow: ellipsis; /* 用省略号表示被隐藏的文本 */  
		white-space: nowrap; /* 防止文本换行 */  
		width: 180rpx;
		font-size: 30rpx;
	}
	
	
	.item .itemInfo .title>text{
		font-size: 26rpx;
	}
	
	
	.item .itemInfo .itemContent {  
		color: #707070;
	    position: relative; /* 定位伪元素 */  
	    font-size: 26rpx;  
	    width: 100%;  
		height: 100%;
	    display: -webkit-box; /* 使用flexbox布局 */  
	    -webkit-box-orient: vertical; /* 垂直排列子元素 */  
	    -webkit-line-clamp: 3; /* 设置显示的行数 */  
	    overflow: hidden; /* 隐藏超出部分 */  
	    padding: 10rpx; /* 根据需要添加内边距 */  
	    box-sizing: border-box; /* 确保内边距不会增加元素的总宽度和高度 */  
	}  	
	
	.passTitle{
		position: absolute;
		right: 20rpx;
		color: green;
	}
	
	.notPassTitle{
		position: absolute;
		right: 20rpx;
		color: red;
	}
</style>