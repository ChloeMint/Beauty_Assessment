<template>
	<view class="content">
		<view class="item" v-for="item in join" :key="item.id" @click="turnToAuditResult(item.id,item.avg_score)">
			<auditProductCard :image="base_url+item.image_list[0]" :name="item.product_name" :status="item.status" :content="item.product_introduce"></auditProductCard>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import auditProductCard from "@/components/auditProductCard.vue"
	import {onLoad,onShow} from '@dcloudio/uni-app'
	import createRequest from '@/network.js';
	 
	let base_url = ref("")
	let token = ref("")
	
	uni.getStorage({
		key:"baseUrl",
		success: (res) => {
			base_url.value = res.data
		}
	})
	
	
	
	const join = ref([])
	
	onLoad(()=>{
		uni.getStorage({
			key:"token",
			success: (res) => {
				token.value = res.data
				
				createRequest("/test/getPublishedBySelf","GET",{
							'Content-Type': 'application/json',
							'Authorization': token.value
						},{}).then((data) => {
							console.log(data)
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
		})
		
	})
	
	function turnToAuditResult(itemId,score){
		uni.navigateTo({
			url:"/pages/AduditResult/AduditResult?itemId="+itemId+"&score="+score
		})
	}
</script>

<style scoped>
	.content{
		width: calc(100% - 80rpx);
		padding: 40rpx;
	}
</style>
