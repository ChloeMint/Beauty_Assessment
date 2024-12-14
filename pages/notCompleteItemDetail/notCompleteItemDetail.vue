<template>
	<view class="content">
		<view id="first">
			<text>产品名称</text>
			<text>{{product.product_name}}</text>
			<image src="../../static/分享.png" mode="aspectFill" @click="turnToSharePage(product.id)"></image>
		</view>
		
		<view id="second">
			<text>产品类型</text>
			<text>{{product.type}}</text>
		</view>
		
		<text class="title">产品图</text>
		
		<view id="images">
			<image :src="base_url+image" mode="aspectFill" v-for="image in product.image_list"></image>
		</view>
		
		<text class="title" id="spe">使用方式</text>
		
		<text id="fifth">{{product.product_introduce}}</text>
	
		<text class="title">测评分组</text>
		
		<view id="sixth">
			<view v-for="skinType in product.skin_list">
				<text>{{skinType}}</text>
				<text>，</text>
			</view>	
		</view>
		
		<view id="time">
			<text>起始时间</text>
			<text>{{product.start_time}}</text>
			<text>——</text>
			<text>{{product.end_time}}</text>
			<image src="../../static/24gl-calendar.png" mode="aspectFill"></image>
		</view>
		
		<button @click="turnToInputTest" :disabled="buttonDisabled" :class="buttonDisabled?'':'selectStyleButton'">填写测评</button>
	</view>
</template>

<script setup>
	import {ref} from "vue";
	import {onLoad} from '@dcloudio/uni-app'
	import createRequest from '@/network.js';
	const itemId = ref(0)
	const buttonDisabled = ref(true)
	let base_url = ref("")
	
	uni.getStorage({
		key:"baseUrl",
		success: (res) => {
			base_url.value = res.data
		}
	})
	
	const product = ref({})
	
	onLoad((option)=>{
		itemId.value = option.itemId
		// 调用网络请求,为data赋值
		createRequest("/product/productDetail/"+itemId.value,"GET",{
					'Content-Type': 'application/json'
				},{}).then((data) => {
					if (data.code == 200){
						console.log(data.data)
						product.value = data.data
						buttonDisabled.value = isFutureTime(product.value.start_time)
					}else{
						uni.showToast({ title: data.msg, icon: 'none' });
					}
				}).catch((error) => {  
					// 捕获并处理错误  
					console.error("请求失败:", error);  
					uni.showToast({ title: error.errMsg, icon: 'error' });
					// 可以在这里处理错误，比如显示错误消息给用户  
				})
	})
	
	function turnToSharePage(itemId){
		console.log(itemId)
		uni.navigateTo({
			url:"/pages/share/share?itemId="+itemId
		})
	}
	
	function turnToInputTest(){
		uni.navigateTo({
			url:"/pages/inputTest/inputTest?itemId=" + itemId.value
		})
	}
	
	function isFutureTime(time){
		let date = new Date()
		let nowYear = date.getFullYear()
		let nowMonth = date.getMonth()
		let nowDay = date.getDate()
		
		let parts = time.split('.');  
		let year = parseInt(parts[0])
		let month = parseInt(parts[1]) - 1
		let day = parseInt(parts[2])
		if(nowYear < year){
			return true;
		}
		
		if(nowYear == year && nowMonth<month){
			return true;
		}
		
		if(nowYear == year && nowMonth == month && nowDay<day){
			return true;
		}
		
		return false;
	}
</script>

<style scoped>
	.content{
		display: flex;
		flex-direction: column;
		padding: 40rpx;
		width: calc(100% - 80rpx);
		/* height: calc(100vh - 80rpx); */
	}
	
	.content #first{
		position: relative;
		width: 100%;
		height: 48rpx;
	}
	
	.content #first>text:nth-child(1){
		font-size: 36rpx;
		font-weight: bold;
		color: #666666;
	}
	
	.content #first>text:nth-child(2){
		font-size: 30rpx;
		margin-left: 40rpx;
		color: #666666;
	}
	
	.content #first>image{
		width: 48rpx;
		height: 48rpx;
		right: 0rpx;
		position: absolute;
	}
	
	.content #second{
		margin-top: 40rpx;
		width: 100%;
		height: 48rpx;
	}
	
	.content #second>text:nth-child(1){
		font-size: 36rpx;
		font-weight: bold;
		color: #666666;
	}
	
	.content #second>text:nth-child(2){
		margin-left: 40rpx;
		padding: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #0E68CD;
		background-color: #d0ebff;
	}
	
	.content #third{
		margin-top: 40rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #666666;
	}
	
	.content #images{
		margin-top: 40rpx;
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.content #images>image{
		margin-bottom: 20rpx;
		width: 200rpx;
		height: 200rpx;
		margin-right: calc((100% - 600rpx)/3);
		border-radius: 10rpx;
	}
	
	.content #images>image:last-child{
		margin-right: 0rpx;
	}
	
	.title{
		margin-top: 40rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #666666;
	}
	
	#spe{
		margin-top: 20rpx;
	}
	
	.content #fifth{
		margin-top: 40rpx;
		font-size: 26rpx;
		color: #707070;
	}
	
	.content #sixth{
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: auto;
		margin-top: 40rpx;
	}
	
	.content #sixth text{
		font-size: 30rpx;
		color: #666666;
	}
	
	.content #sixth view:last-child text:last-child{
		display: none;
	}
	
	.content #time{
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	
	.content #time text{
		color: #666666;
		font-size: 30rpx;
		margin-top: 3rpx;
	}
	
	.content #time text:nth-child(1){
		margin-top: 0rpx;
		margin-right: 40rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #666666;
	}
	
	.content #time>image{
		margin-left: 20rpx;
		width: 40rpx;
		height: 40rpx;
	}
	
	.content>button{
		font-size: 30rpx;
		line-height: 92rpx;
		margin-top: 40rpx;
		width: 100%;
		height: 92rpx;
	}
	
	.selectStyleButton{
		color: white;
		background-color: #0E68CD;
	}
	
</style>
