<template>
	<view class="content">
		<view class="item" @click="changeAvatar()">
			<text>修改头像</text>
			<image class="rightButton" src="../../static/右箭头.png" mode="aspectFill"></image>
		</view>
		
		<view class="item" @click="changeUsername()">
			<text>修改昵称</text>
			<image class="rightButton" src="../../static/右箭头.png" mode="aspectFill"></image>
		</view>
		
		
		<image src="../../static/退出登录.png" mode="aspectFill" id="logout" @click="logout"></image>
		
	</view>
</template>

<script setup>
	import { ref, watch } from "vue";
	import createRequest from '@/network.js';
	import {onLoad} from '@dcloudio/uni-app'
	const selectedImage = ref("")
	let base_url = ref("")
	let token = ref("")
	
	onLoad(()=>{
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				base_url.value = res.data
			}
		})
	})
	
	
	function changeAvatar(){
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				uni.getStorage({
					key:"token",
					success: (tokenRes) => {
						token.value = tokenRes.data
						selectedImage.value = res.tempFilePaths[0]
						uni.uploadFile({
						    url: base_url.value+'/user/changeUserAvatar', // 替换为实际的上传接口地址
						    filePath: selectedImage.value,
						    name: 'files', // 后端接收文件时对应的字段名
							header:{
								'Authorization': token.value
							},
						    success: (uploadFileRes) => {
						        // 在这里处理上传成功的逻辑
								let result = JSON.parse(uploadFileRes.data)
								console.log(result)
								if (result.code == 200){
									uni.setStorage({
										key:'avatar',
										data:result.data
									})
									uni.showToast({
										title:"修改成功"
									})
									uni.showToast({ title: '提交成功', icon: 'none' });
									setTimeout(()=>{
										uni.navigateBack(
											{delta:1}
										)
									}, 500)
								}else{
									uni.showToast({ title: '提交失败,'+result.msg, icon: 'none' });
								}
						    },
						    fail: (error) => {
						        console.error('Upload failed:', error);
						        // 在这里处理上传失败的逻辑
								uni.showToast({ title: '提交失败', icon: 'none' });
						    }
						});
					}
				})
				
				
			}
		});
	}
	
	function changeUsername(){
		uni.navigateTo({
			url:"/pages/ChangeUsername/ChangeUsername"
		})
	}
	
	function logout(){
		uni.showModal({
			title:"退出登录",
			content:"请问您确定要退出登陆吗?",
			success: function (res) {
					if (res.confirm) {
						uni.reLaunch({
							url:"/pages/Login/Login"
						})
						
						uni.removeStorage({
							key: 'permissions'
						});
						
						uni.removeStorage({
							key: 'token'
						});
						
						uni.removeStorage({
							key: 'username'
						});
						
						
						uni.removeStorage({
							key: 'avatar'
						});
						
						uni.removeStorage({
							key: 'userId'
						});
					} else if (res.cancel) {
						
					}
				}
		})
	}
</script>

<style>
	.content{
		width: 100%;
	}
	
	.content .item{
		position: relative;
		display: flex;
		flex-direction: row;
		padding: 40rpx;
		width: calc(100% - 80rpx);
		height: 40rpx;
		line-height: 40rpx;
		border-bottom: 2rpx solid #f1f1f1;
		font-size: 36rpx;
		color: #707070;
	}
	
	.content .item .rightButton{
		position: absolute;
		width: 54rpx;
		height: 54rpx;
		top: calc(50% - 27rpx);
		right: 40rpx;
	}
	
	.content #logout{
		position: fixed;
		left: 80%;
		top: 80%;
		width: 70rpx;
		height: 70rpx;
		background-color: #e8e8e8;
		border: 2rpx solid #cbcbcb;
		border-radius: 50%;
		padding: 16rpx;
	}
</style>
