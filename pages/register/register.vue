<template>
	<view class="login-bg">
		<image class="img-a" src="https://zhoukaiwen.com/img/loginImg/bg1.png"></image>
		<view class="t-login">
			<view class="t-b">注 册</view>
			<form class="cl">
				<view class="t-a">
					<image src="../../static/用户(蓝).png"></image>
					<input type="number" name="phone" placeholder="请输入手机号码" maxlength="11" v-model="phone" />
				</view>
				
				<view class="t-a">
					<image src="../../static/密码(蓝).png"></image>
					<input type="password" name="code" placeholder="请输入密码" v-model="pwdOne" />
				</view>
				
				<view class="t-a">
					<image src="../../static/密码(蓝).png"></image>
					<input type="password" name="code" placeholder="请再次输入密码" v-model="pwdTwo" />
				</view>
				<button @click="register()">注 册</button>
			</form>
		</view>
		<view class="cardBox">
			<view @click="turnToLogin()">
				返回登录
			</view>
		</view>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/bg2.png"></image>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import createRequest from '@/network.js';
	const phone = ref("")
	const pwdOne = ref("")
	const pwdTwo = ref("")
	
	function turnToLogin(){
		uni.navigateBack({
			delta:1
		})
	}
	
	function register(){
		if (phone.value == "") {
			uni.showToast({ title: '您还未输入手机号', icon: 'none' });
			return;
		}
		
		if (pwdOne.value == "") {
			uni.showToast({ title: '您的密码为空', icon: 'none' });
			return;
		}
		
		if (pwdTwo.value == "") {
			uni.showToast({ title: '您的确认密码为空', icon: 'none' });
			return;
		}
		
		if (!/^[0-9]{11}$/.test(phone.value)) {
			uni.showToast({ title: '请输入正确手机号', icon: 'none' });
			return;
		}
		
		if(pwdOne.value != pwdTwo.value){
			uni.showToast({ title: '两次输入的密码不同', icon: 'none' });
			return;
		}
		
		createRequest("/user/register","POST",{
					'Content-Type': 'application/json'
				},{
					'phone':phone.value,
					'password':pwdTwo.value
				}).then((data) => {
					console.log(data)
					if (data.code == 200){
						uni.showToast({ title: '注册成功' });
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
</script>

<style>
	.img-a {
		width: 100%;
		height: 300rpx;
	}
	.img-b {
		width: 100%;
		height: 45px;
		bottom: 0;
		position: absolute;
	}
	.login-bg {
		height: 100vh;
		background: linear-gradient(to bottom, #749eff, #aafefc);
	}
	
	.t-login {
		width: 600rpx;
		padding: 55rpx;
		margin: 0rpx auto;
		font-size: 28rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		position: relative;
		margin-top: -100rpx;
		box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.15);
		z-index: 9;
	}
	.t-login button {
		font-size: 28rpx;
		background: linear-gradient(to right, #749eff, #aafefc);
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
	}
	
	.t-login input {
		padding: 0 20rpx 0 120rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #f6f6f6;
		border: 1px solid #f6f6f6;
		font-size: 28rpx;
		border-radius: 50rpx;
	}
	
	.t-login .t-a {
		position: relative;
	}
	
	.t-login .t-a image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 40rpx;
		top: 28rpx;
	}
	
	.t-login .t-b {
		text-align: left;
		font-size: 46rpx;
		color: #749eff;
		font-weight: bold;
		margin: 0 0 50rpx 20rpx;
	}
	
	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}
	
	.t-login .t-c {
		text-align: right;
		color: #c0c0c0;
		margin: -20rpx 30rpx 40rpx 0;
	}
	
	.t-login .t-f {
		text-align: center;
		margin: 200rpx 0 0 0;
		color: #666;
	}
	
	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}
	
	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}
	
	.cl {
		zoom: 1;
	}
	
	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
	.cardBox {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 5rpx;
		background: #ffffff;
		opacity: 0.9;
		-webkit-border-radius: 20rpx;
		border-radius: 0 0 20rpx 20rpx;
		height: 70rpx;
		width: 600rpx;
		margin: 0 auto;
		position: relative;
		text-align: center;
		line-height: 70rpx;
		color: #aaa;
		font-size: 28rpx;
	}
	.cardBox .txt {
	    margin-left: 10rpx;
	}
</style>
