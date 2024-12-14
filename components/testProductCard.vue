<template>
	<view class="item">
		<image :src="image" mode="aspectFill"></image>
		<view class="itemInfo">
			<view class="title">
				<view class="ellipsis"><text>{{name}}</text></view>
				<view class="statusBox">
					<view class="timeBox">
						<text>{{startTime}}</text>
						<text>~</text>
						<text>{{endTime}}</text>
					</view>
					
				</view>
			</view>
			<view class="itemContent,ellipsis">
				<text>{{content}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, defineProps } from 'vue';
	
	const obj = defineProps({
			image: String ,
			name:String,
			startTime:String,
			endTime:String,
			content:String,
	})
</script>

<style scoped>
	.item{
		margin-bottom: 20rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		border: 2rpx solid #f0f0f0;
		width: calc(100% - 48rpx);
		height: 150rpx;
		border-radius: 10rpx;
		box-shadow: 4rpx 4rpx 10rpx #F0F0F0;
	}
	
	image{
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}
	
	.itemInfo{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		width: calc(100% - 170rpx);
		height: 100%;
	}
	
	.itemInfo .title{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: auto;
	}
	
	.itemInfo .title .ellipsis{
		margin-right: 20rpx;
		overflow: hidden; /* 隐藏超出容器的文本 */  
		text-overflow: ellipsis; /* 用省略号表示被隐藏的文本 */  
		white-space: nowrap; /* 防止文本换行 */  
		width: 180rpx;
		font-size: 30rpx;
	}
	
	
	.itemInfo .title .statusBox text{
		font-size: 26rpx;
		color: #BFBFBF;
	}
	
	
	.itemInfo .itemContent {  
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
</style>