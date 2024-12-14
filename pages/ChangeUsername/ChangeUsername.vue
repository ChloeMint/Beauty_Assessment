<template>
	<view class="content">
		<view id="box">
			<input type="text" placeholder="请输入您的新昵称" v-model="username" maxlength="5" placeholder-style="color:#908F8F;">
			<button @click="finish()">完成</button>
		</view>
		<text>小tips:昵称不得超过5个字符</text>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import {onLoad} from '@dcloudio/uni-app'
	import createRequest from '@/network.js';
	const username = ref("")
	let token = ref("")
	
	onLoad((option)=>{
		uni.getStorage({
			key:"token",
			success: (res) => {
				token.value = res.data
			}
		})
	})
	
	function finish(){
		if(username.value == ""){
			uni.showToast({ title: '您没有输入任何内容', icon: 'none' });
		}else{
			// 调用网络请求
			createRequest("/user/changeUsername","POST",{
						'Content-Type': 'application/json',
						'Authorization': token.value
					},{
						'username':username.value
					}).then((data) => {
						console.log(data)
						if (data.code == 200){
							uni.setStorage({
								key:'username',
								data:username.value
							})
							uni.showToast({ title: '设置成功' });
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							}, 500)
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
	}
</script>

<style scoped>
	.content{
		width: calc(100% - 80rpx);
		padding: 40rpx;
	}
	
	.content #box{
		width: 100%;
		height: 66rpx;
		display: flex;
		flex-direction: row;
	}
	
	.content #box input{
		width: calc(100% - 160rpx);
		height: 100%;
		border-radius: 10rpx;
		display: block;
		font-size: 30rpx;
		padding: 0rpx 15rpx 0rpx 15rpx;
		background-color: #EDEDED;
	}
	
	.content #box button{
		margin-left: 20rpx;
		width: 140rpx;
		height: 100%;
		font-size: 30rpx;
		line-height: 66rpx;
		color: white;
		font-weight: bold;
		background-color: #0E68CD;
	}
	
	.content>text{
		font-size: 26rpx;
		color: #bdbdbd;
	}
	
	
</style>
