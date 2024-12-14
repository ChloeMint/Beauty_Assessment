<template>
	<view id="outerBox">
		<View id="outer">

			<view id="header">
				<view id="searchBox" @click="turnToSearchPage">
					<image src="../../static/搜索.png"></image>
					<text>搜索</text>
				</view>
				<image src="../../static/扫一扫.png" @click="turnToScanCode"></image>
			</view>

			<swiper id="swiper" indicator-color="#BFBFBF" indicator-dots indicator-active-color="white" autoplay
				circular interval="2000">
				<swiper-item>
					<image src="../../static/banner1.jpg" mode="aspectFill"></image>
				</swiper-item>

				<swiper-item>
					<image src="../../static/banner2.jpg" mode="aspectFill"></image>
				</swiper-item>

				<swiper-item>
					<image src="../../static/banner3.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>

		</View>

		<view id="tabBarBox">
			<view class="item" v-for="(item, index) in tabList">
				<text class="itemText" :key="item.id" @click="chooseTab(index)"
					:class="clickItemIndex == index? 'itemSelect':''">{{item.name}}</text>
			</view>
		</view>

		<scroll-view id="productsBox" scroll-y="true">
			<view class="products" v-for="item in dataList" :key="item.id" @click="turnToItemDetail(item.id, item.avg_score)">
				<productCard :image="base_url+item.image_list[0]" :name="item.product_name" :tags=item.tag_list :score="item.avg_score" :endTime="item.startDate"></productCard>
			</view>

		</scroll-view>
	</view>
</template>

<script setup>
	import {ref} from "vue";
	import productCard from "@/components/productCard.vue"
	import {onLoad} from '@dcloudio/uni-app'
	import createRequest from '@/network.js'; 
	
	
	const tabList = ref(
		[{
				id: 1,
				name: "彩妆"
			},
			{
				id: 2,
				name: "清洁"
			},
			{
				id: 3,
				name: "护理"
			}
		]
	);

	// 调用网络请求
	let base_url = ref("")

	const dataList = ref([

	])

	onLoad((option)=>{
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				base_url.value = res.data
			}
		})
			
		uni.getStorage({
			key: 'token',
			success: function (res) {
				createRequest("/user/getUserInfo","GET",{
					'Content-Type': 'application/json',
					'Authorization': res.data
				},{},false).then((data) => {  
					// 请求成功，处理数据  
					if (data.code == 200){
						let user = data.data
						uni.setStorage({
							key:'permissions',
							data:user.permissions,
						})
							
						uni.setStorage({
							key:'username',
							data:user.username
						})
							
						uni.setStorage({
							key:'avatar',
							data:user.avatar
						})
						
						uni.setStorage({
							key:'userId',
							data:user.id
						})
					}
				}).catch((error) => {  
					// 捕获并处理错误  
					console.error("请求失败:", error);  
				});
			}
		});
	
		getData("makeUp")
	})
	
	function getData(productType){
		createRequest("/product/"+productType,"GET",{
			'Content-Type': 'application/json'
		},{},false).then((data) =>{
			if (data.code == 200){
				dataList.value = data.data
			}
		}).catch((error) => {  
			// 捕获并处理错误  
			console.error("请求失败:", error);  
		});
	}
	

	let clickItemIndex = ref("")

	function chooseTab(index) {
		clickItemIndex.value = index
		if (index == 0) {
			// 调用网络请求
			getData("makeUp")
		} else if (index == 1) {
			// 调用网络请求
			getData("clean")
		} else {
			// 调用网络请求
			getData("care")
		}
	}

	function turnToSearchPage() {
		uni.navigateTo({
			url: "/pages/search/search"
		})
	}

	function turnToItemDetail(itemId,score) {
		let url = "/pages/ItemDetail/ItemDetail?itemId=" + itemId + "&score=" + score
		uni.navigateTo({
			url
		})
	}

	function turnToScanCode() {
		
		uni.scanCode({  
		    success: function (res) {  
				uni.showToast({ title: '扫描成功', icon: 'none' });
		        // 在这里处理扫描到的二维码数据，例如跳转到某个页面或执行其他操作  
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pages/ScanResult/ScanResult?itemId=" + res.result
					})
				}, 1000)
		    },  
		    fail: function (err) {  
				console.log(err) //item的id
				uni.showToast({ title: '扫描失败，二维码无效', icon: 'none' });
		        // 在这里处理扫描失败的情况  
		    }  
		}); 
	}
</script>

<style scoped>
	#outer {
		position: relative;
		width: 100%;
		height: 220px;
	}

	#outer #swiper {
		width: 100%;
		height: 100%;
	}

	#outer #swiper swiper-item image {
		width: 100%;
	}

	#header {
		margin-top: 10px;
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 40px;
		float: left;
	}

	#header #searchBox {
		padding-left: 10px;
		margin-top: 6px;
		margin-left: 20px;
		float: left;
		width: 272px;
		height: 28px;
		opacity: 0.5;
		border-radius: 20px;
		background-color: white;
	}

	#header #searchBox image {
		float: left;
		width: 18px;
		height: 18px;
	}

	#header image {
		margin-right: 20px;
		margin-top: 6px;
		float: right;
		width: 28px;
		height: 28px;
	}

	#header #searchBox text {
		margin-top: 4px;
		margin-left: calc(50% - 50px);
		color: #8A8A8A;
		font-size: 13px;
		float: left;
	}

	#outerBox #tabBarBox {
		width: 100%;
		height: 50px;
		background-color: white;
		box-shadow: #CCC 2px 2px 3px;
	}

	#outerBox #tabBarBox .item {
		float: left;
		width: calc((100% - 40px)/3);
		height: 100%;
	}

	#outerBox #tabBarBox .item:nth-child(1) {
		margin-left: 40px;
	}

	#outerBox #tabBarBox .item text {
		margin-left: 15px;
		font-size: 15px;
		line-height: 50px;
	}

	.itemText {
		color: #908F8F;
	}

	.itemSelect {
		color: black;
		border-bottom: 2px solid black;
	}

	#outerBox #productsBox {
		padding: 20px;
		height: calc(100vh - 310px);
	}

	#outerBox #productsBox .products {
		position: relative;
		width: calc(100% - 40px);
		height: 100px;
		background-color: white;
		box-shadow: #cfcfcf 2px 2px 5px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	/* 防止最外层滚动 */

	#outerBox {
		background-color: #f8f8f8;
		height: 100vh;
	}

</style>