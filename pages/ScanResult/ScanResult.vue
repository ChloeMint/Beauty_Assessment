<template>
	<view class="content">
		<view id="first">
			<text class="title">产品名称</text>
			<text>{{product.product_name}}</text>
		</view>
		<image :src="base_url+product.image_list[0]" mode="aspectFill"></image>
		
		<text class="title">测评分组</text>
		<view id="skinType">
			<view v-for="item in product.skin_list" :key="item">
				<text>{{item}}</text>
				<text>，</text>
			</view>
		</view>
		
		<view id="divider"></view>
		
		<text id="question">是否加入该测评分组？</text>
	
		<view id="buttonBox">
			<button @click="comfirm">确定</button>
			<button @click="cancel">取消</button>
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import { ref } from "vue";
	import createRequest from '@/network.js'; 
	const product = ref({
		"image_list":[""]
	})
	const base_url = ref("")
	const token = ref("")
	let productId = ref(0)
	onLoad((option)=>{
		productId.value = option.itemId
		createRequest("/product/productDetail/"+productId.value,"GET",{
			'Content-Type': 'application/json'
		},{}).then((data) => {
			if (data.code == 200){
				product.value = data.data
			}else{
				uni.showToast({ title: data.msg, icon: 'none' });
			}
		}).catch((error) => {  
			// 捕获并处理错误  
			console.error("请求失败:", error);  
			uni.showToast({ title: error.errMsg, icon: 'error' });
			// 可以在这里处理错误，比如显示错误消息给用户  
		})
		
		
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
			}
		})
	})
	function comfirm(){
		createRequest("/test/joinedTest","POST",{
			'Content-Type': 'application/json',
			'Authorization': token.value
		},{
			'product_id':product.value.id
		}).then((data) => {
			
			if (data.code == 200){
				uni.showToast({
					title:"加入成功",
					icon:""
				})
				setTimeout(()=>{
					uni.navigateBack(
						{delta:1}
					)
				}, 1000)
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
	
	function cancel(){
		uni.navigateBack(
			{delta:1}
		)
	}
</script>

<style scoped>
	.content{
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		width: calc(100% - 80rpx);
		height: calc(100vh - 80rpx);
	}
	
	.title{
		font-size: 36rpx;
		color: #666666;
		font-weight: bold;
		margin-right: 40rpx;
	}
	
	.content #first{
		width: 100%;
		height: 54rpx;
	}
	
	.content #first>text:nth-child(2){
		font-size: 36rpx;
		color: #666666;
	}
	
	.content>image{
		margin-bottom: 40rpx;
		border-radius: 20rpx;
		margin-top: 40rpx;
		width: 210rpx;
		height: 210rpx;
	}
	
	.content #skinType{
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		color: #666666;
		font-size: 30rpx;
		margin-top: 40rpx;
	}
	
	.content #skinType>view:last-child>text:last-child{
		display: none;
	}
	
	.content #divider{
		margin-top: 40rpx;
		width: 100%;
		height: 2rpx;
		background-color: #EFEFEF;
		margin-bottom: 40rpx;
	}
	
	.content #question{
		font-size: 30rpx;
		color: black;
	}
	
	.content #buttonBox{
		position: relative;
		margin-top: 40rpx;
		width: 100%;
		height: 92rpx;
	}
	
	.content #buttonBox>button{
		width: 300rpx;
		height: 92rpx;
		font-size: 30rpx;
		line-height: 92rpx;
		color: white;
		position: absolute;
	}
	
	.content #buttonBox>button:nth-child(1){
		left: 0;
		background-color: #0E68CD;
	}
	
	.content #buttonBox>button:nth-child(2){
		right: 0;
		background-color: #BFBFBF;
	}
</style>
