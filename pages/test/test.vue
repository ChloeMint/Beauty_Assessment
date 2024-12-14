<template>
	<view id="content">
		<view id="new">
			<text>新建测评</text>
			<view id="newInfo">
				<text>若没有找到想要的测评可以点击右侧按钮新建</text>
				<button @click="turnToNewTest">新建</button>
			</view>
		</view>
		
		<scroll-view scroll-y="true" >
			<view id="publish">
				<view id="mePublishTag" @click="publishShow = !publishShow">
					<image src="../../static/择律-选择费用-倒三角形-反对.png" mode="" :class="publishShow? 'rotate':''"></image>
					<text>我发起的测评</text>
				</view>
				
				<view v-if="publishShow">
					
					<view v-for="item in selfPublish" :key="item.id" @click="turnToDetail(item.id, item.end_time,item.avg_score)">
						<testProductCard :image="base_url+item.image_list[0]" :name="item.product_name" :startTime="item.start_time" :content="item.product_introduce" :endTime="item.end_time"></testProductCard>
					</view>
					
				</view>
				
			</view>
			<view id="join">
				<view id="meJoinhTag" @click="joinShow = !joinShow">
					<image src="../../static/择律-选择费用-倒三角形-反对.png" mode="aspectFill" :class="joinShow? 'rotate':''"></image>
					<text>我加入的测评</text>
				</view>
				<view v-if="joinShow">
					
					<view v-for="item in join" :key="item.id" @click="turnToDetail(item.id, item.end_time,item.avg_score)">
						<testProductCard :image="base_url+item.image_list[0]" :name="item.product_name" :startTime="item.start_time" :content="item.product_introduce" :endTime="item.end_time"></testProductCard>
					</view>
					
					
					
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import testProductCard from "@/components/testProductCard.vue"
	import {onPullDownRefresh, onLoad} from '@dcloudio/uni-app'
	import createRequest from '@/network.js';
	
	const publishShow = ref(false)
	const joinShow = ref(false)
	let base_url = ref("")
	const selfPublish = ref([])
	const join = ref([])
	const token = ref("")
	
	onLoad((option)=>{
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
		createRequest("/test/getPublishedBySelf","GET",{
			'Content-Type': 'application/json',
			'Authorization': token
		},{}).then((data) => {
			if (data.code == 200){
					selfPublish.value = data.data
					uni.stopPullDownRefresh()
				}else{
					uni.showToast({ title: data.msg, icon: 'none' });
				}
			}).catch((error) => {  
				// 捕获并处理错误  
				console.error("请求失败:", error);  
				uni.showToast({ title: error.errMsg, icon: 'error' });
				// 可以在这里处理错误，比如显示错误消息给用户  
			})
			
		createRequest("/test/getJoinedBySelf","GET",{
					'Content-Type': 'application/json',
					'Authorization': token
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
	
	onPullDownRefresh(()=>{
		getData(token.value)
	})
	
	function parseCustomDateString(dateString) {  
	    let dateStringList = dateString.split(".")
		let year = dateStringList[0]
		let month = parseInt(dateStringList[1])
		if (month <= 10){
			let realMonth = month
			month = "0" + realMonth
		}
		let day = dateStringList[2]
		if (parseInt(day) < 10){
			day = "0" + day
		}
		let newDateString = dateStringList[0]+"-"+month + "-" +day + " 23:59:59"
		let date = new Date(newDateString)
		let now = new Date()
		return now.getTime() > date.getTime()
	}  
	
	function turnToDetail(id, endTime, score){
		if(parseCustomDateString(endTime)){
			// "已过时间"
			uni.navigateTo({
				url:"/pages/ItemDetail/ItemDetail?itemId=" + id + "&score="+score
			})
		}else{
			// "未过时间"
			uni.navigateTo({
				url:"/pages/notCompleteItemDetail/notCompleteItemDetail?itemId=" + id
			})
		}
	}
	
	function turnToNewTest(){
		uni.navigateTo({
			url:"/pages/newTest/newTest"
		})
	}
</script>

<style scoped>
	#content{
		padding: 40rpx;
		width: calc(100% - 80rpx);
		height: calc(100vh - 80rpx);
	}
	
	#content #new{
		display: flex;
		flex-direction: column;
		padding: 40rpx;
		width: calc(100% - 84rpx);
		height: auto;
		border: 2rpx solid #E1E1E1;
		border-radius: 10rpx;
	}
	
	#content #new>text{
		font-size: 36rpx;
		font-weight: bold;
	}
	
	#content #new #newInfo{
		display: flex;
		flex-direction: row;
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}
	
	#content #new #newInfo>text{
		font-size: 26rpx;
		color: #908F8F;
		width: 364rpx;
		height: auto;
	}
	
	#content #new #newInfo>button{
		font-size: 26rpx;
		color: white;
		width: 150rpx;
		height: 68rpx;
		margin-left: 80rpx;
		background-color: #0E68CD;
	}
	
	#content>scroll-view{
		margin-top: 40rpx;
		/* background-color: #00ffff; */
		width: 100%;
		height: calc(100% - 240rpx);
	}
	
	scroll-view #publish{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}
	
	scroll-view #publish #mePublishTag{
		width: 100%;
		height: 48rpx;
		display: flex;
		flex-direction: row;
		margin-bottom: 40rpx;
	}
	
	#mePublishTag>image{
		margin-top: 4rpx;
		width: 40rpx;
		height: 40rpx;
	}
	
	#mePublishTag>text{
		font-size: 36rpx;
		color: #908F8F;
	}
	
	#join{
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
	}
	
	#meJoinhTag{
		margin-bottom: 40rpx;
	}
	
	
	#meJoinhTag>image{
		width: 40rpx;
		height: 40rpx;
	}
	
	#meJoinhTag>text{
		font-size: 36rpx;
		color: #908F8F;
	}
	
	.item{
		margin-bottom: 20rpx;
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
	
	.rotate{
		transform: rotate(90deg);
		transition: transform 0.5s ease;
	}
</style>
