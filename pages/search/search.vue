<template>
	<view class="content">
		<view id="header">
			<view id="searchBox">
				<image src="../../static/搜索.png"></image>
				<input type="text" placeholder="请输入测评的产品名称" v-model="searchName">
			</view>
			
			<view id="searchButton" @click="search">
				搜索
			</view>
		</view>
		
		<scroll-view scroll-y>
			<view class="item" v-for="item in dataList" :key="item.id" @click="turnToDetail(item.id,item.avg_score)">
				<productCard :image="base_url+item.image_list[0]" :name="item.product_name" :tags="item.tag_list" :score="item.avg_score" :endTime="item.end_time"></productCard>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {ref} from "vue";
	import productCard from "@/components/productCard.vue"
	import createRequest from '@/network.js';
	import {onLoad} from '@dcloudio/uni-app'
	
	const searchName = ref("")
	const dataList = ref([
				
			])
	const base_url = ref("")
	
	onLoad((option)=>{
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				base_url.value = res.data
			}
		})
	})
	
	function search(){
		createRequest("/product/search/"+searchName.value,"GET",{
					'Content-Type': 'application/json'
				},{}).then((data) => {
					console.log(data)
					if (data.code == 200){
						dataList.value = data.data
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
	
	
	
	function turnToDetail(itemId,score){
		uni.navigateTo({
			url:"/pages/ItemDetail/ItemDetail?itemId=" + itemId + "&score=" + score
		})
	}
</script>

<style scoped>
	.content{
		width: 100%;
		height: 100vh;
	}
	
	#header{
		height: 60px;
		width: 100%;
	}
	
	.content #header #searchBox{
		border-radius: 20px;
		float: left;
		margin-left: 20px;
		margin-top: 15px;
		width: 250px;
		width: calc(100% - 90px);
		background-color: #EAEAEA;
		height: 30px;
	}
	
	.content #header #searchButton{
		margin-left: 10px;
		margin-top: 15px;
		float: left;
		width: 40px;
		height: 30px;
		font-size: 15px;
		text-align: center;
		font-weight: bold;
		line-height: 30px;
	}
	
	#searchBox>image{
		float: left;
		margin-top: 6px;
		margin-left: 10px;
		width: 18px;
		height: 18px;
	}
	
	#searchBox>input{
		font-size: 13px;
		float: left;
		width: calc(100% - 48px);
		height: 100%;
		margin-left: 10px;
	}
	
	scroll-view{
		width: 100%;
		height: calc(100% - 60px);
	}
	
	scroll-view .item{
		position: relative;
		margin-top: 10px;
		margin-left: 20px;
		margin-right: 20px;
		width: calc(100% - 40px);
		height: 100px;
		border-radius: 10px;
		box-shadow: #e1e1e1 1px 1px 5px;
	}
	
</style>
