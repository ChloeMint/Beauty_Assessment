<template>
  <view class="content">
	  <view id="header">
		  <image id="background" src="../../static/background.jpg" mode="aspectFill"></image>
		  <image id="avatar" :src="baseUrl+avatar" mode="aspectFill"></image>
		  <text id="username">{{username}}</text>
		  <text id="who" v-if="permission == 0">管理员</text>
		  <text id="who" v-if="permission == 1">普通用户</text>
	  </view>
	  <view id="content">
		  <view class="item" v-if="permission == 0" @click="turnToAuditListPage()">
			  <image src="../../static/测评.png" mode="aspectFill" class="icon"></image>
			  <text>测评审核</text>
			  <image class="rightForwards" src="../../static/右箭头.png" mode="aspectFill"></image>
		  </view>
		  <view class="line" v-if="permission == 0"></view>
		  
		  <view class="item" v-if="permission == 0" @click="turnToAlreadyAuditPage()">
		  		<image src="../../static/完成.png" mode="aspectFill" class="icon"></image>
		  		<text>已审核</text>
		  		<image class="rightForwards" src="../../static/右箭头.png" mode=""></image>
		  </view>
		  <view class="line" v-if="permission == 0"></view>
		  
		  <view class="item" @click="turnToMyAuditPage()">
		  		<image src="../../static/风险测评.png" mode="aspectFill" class="icon"></image>
		  		<text>我的审核结果</text>
		  		<image class="rightForwards" src="../../static/右箭头.png" mode=""></image>
		  </view>
		  <view class="line"></view>
		  
		  <view class="item" @click="turnToSetting()">
		  		<image src="../../static/设置.png" mode="aspectFill" class="icon"></image>
		  		<text>设置</text>
		  		<image class="rightForwards" src="../../static/右箭头.png" mode=""></image>
		  </view>
		  <view class="line"></view>
	  </view>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";
import {onLoad, onShow} from '@dcloudio/uni-app'
	const permission = ref()
	const avatar = ref("")
	const username = ref("")
	const baseUrl = ref("")
	
	onLoad((option)=>{
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				baseUrl.value = res.data
			}
		})
	})
	
	function initUserInfo(){
		uni.getStorage({
			key:"permissions",
			success: (res) => {
				permission.value = res.data
			}
		})
		
		uni.getStorage({
			key:"username",
			success: (res) => {
				username.value = res.data
			}
		})
		
		uni.getStorage({
			key:"avatar",
			success: (res) => {
				avatar.value = res.data
			}
		})
	}
	
	function turnToAuditListPage(){
		uni.navigateTo({
			url:"/pages/AuditList/AuditList"
		})
	}
	
	function turnToAlreadyAuditPage(){
		uni.navigateTo({
			url:"/pages/AlreadyAdudit/AlreadyAdudit"
		})
	}
	
	
	function turnToMyAuditPage(){
		uni.navigateTo({
			url:"/pages/MyAuditList/MyAuditList"
		})
	}
	
	function turnToSetting(){
		uni.navigateTo({
			url:"/pages/setting/setting"
		})
	}
	
	onShow(()=>{
		initUserInfo()
	})
</script>

<style scoped>
  .content #header{
	  width: 100%;
	  height: 334rpx;
	  position: relative;
  }
  
  .content #header #background{
	  width: 100%;
	  height: 100%;
	  border-radius: 0rpx 0rpx 20rpx 20rpx;
	  position: absolute;
	  left: 0rpx;
	  top: 0rpx;
  }
  
  .content #header #avatar{
	  position: absolute;
	  width: 132rpx;
	  height: 132rpx;
	  border-radius: 50%;
	  top: calc(50% - 66rpx);
	  left: 40rpx;
  }
  
  .content #header #username{
	  position: absolute;
	  top: calc(50% - 66rpx);
	  left: 212rpx;
	  font-size: 40rpx;
  }
  
  .content #header #who{
	  position: absolute;
	  top: calc(50% + 14rpx);
	  left: 212rpx;
  }
  
  .content #content{
	  margin-top: 30rpx;
	  width: 100%;
  }
  
  .item{
	  position: relative;
	  display: flex;
	  flex-direction: row;
	  padding: 40rpx;
	  width: calc(100% - 80rpx);
	  height: 58rpx;
  }
  
  .item .icon{
	  width: 58rpx;
	  height: 58rpx;
  }
  
  .item>text{
	  color: #707070;
	  font-size: 36rpx;
	  margin-left: 20rpx;
	  line-height: 58rpx;
  }
  
  .item .rightForwards{
	  position: absolute;
	  width: 54rpx;
	  height: 54rpx;
	  right: 40rpx;
  }
  
  .line{
	  width: calc(100% - 40rpx);
	  margin-left: 40rpx;
	  height: 2rpx;
	  opacity: 0.5;
	  background-color: #E6E6E6;
  }
</style>