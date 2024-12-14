<template>
	<view class="content">
		<view v-for="item in join" :key="item.id" @click="turnToAuditDetail(item.id,item.avg_score)">
			<testProductCard :image="base_url+item.image_list[0]" :name="item.product_name" :startTime="item.start_time" :endTime="item.end_time" :content="item.product_introduce"></testProductCard>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import {onLoad,onShow} from '@dcloudio/uni-app'
	import createRequest from '@/network.js'; 	
	import testProductCard from "@/components/testProductCard.vue"
	
	let base_url = ref("")
	const join = ref([])
	let token = ref("")
	
	onShow((option)=>{
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				base_url.value = res.data
			}
		})
		
		uni.getStorage({
			key:"token",
			success: (res) => {
				token.value = res.data
				getData(res.data)
			}
		})
	})
		
	function getData(token){
		createRequest("/product/notAuditProduct","GET",{
					'Content-Type': 'application/json',
					'Authorization': token
				},{}).then((data) => {
					console.log(data.data)
					if (data.code == 200){
						join.value = data.data
					}else{
						uni.showToast({ title: data.msg, icon: 'none' });
					}
				}).catch((error) => {  
					// 捕获并处理错误  
					console.error("请求失败:", error);  
					uni.showToast({ title: error.errMsg, icon: 'error' });
					// 可以在这里处理错误，比如显示错误消息给用户  
				})
	}
	
	function turnToAuditDetail(itemId,score){
		uni.navigateTo({
			url:"/pages/AuditDetail/AuditDetail?itemId="+itemId+"&score="+score
		})
	}
</script>

<style scoped>
	.content{
		width: calc(100% - 80rpx);
		padding: 40rpx;
	}
	
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
		color: #BFBFBF;
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
</style>
