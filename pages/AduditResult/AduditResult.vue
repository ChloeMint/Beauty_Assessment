<template>
	<scroll-view id="content" scroll-y="true" >
		<view id="firstBlock">
			<view id="productOuter">
				<image :src="base_url+TestData.image_list[0]" mode="aspectFill"></image>
				<view id="infoView">
					<view id="rightView">
						<text id="productName">{{TestData.product_name}}</text>
						<text>发布者:{{TestData.publish_by.username}}</text>
					</view>
					<view id="timeBox">
						<text>{{TestData.start_time}}</text>
						<text>~</text>
						<text>{{TestData.end_time}}</text>
					</view>
					<view id="starBox">
						<image src="../../static/星星（黄）.png" v-for="starCount in fullStar(score)"></image>
						<image src="../../static/半星.png" v-if="shouldShowHalfStar(score)"></image>
						<image src="../../static/星星.png" v-for="emptyCount in emptyStar(score)"></image>
						<text>{{score.toFixed(1)}}</text>
					</view>
				</view>
			</view>
			<view id="introdectionBox">
				<text>产品简介</text>
				<text>{{TestData.product_introduce}}</text>
			</view>
			
			<image class="AduditImage" src="../../static/已通过.png" mode="aspectFill" v-if="TestData.status == 1"></image>
			<image class="AduditImage" src="../../static/weitongguo.png" mode="aspectFill" v-if="TestData.status == 0"></image>
		</view>
		
		<view id="secondBlock">
			<text>肤质指标</text>
			<view id="bar">
				<qiun-data-charts
				  type="bar"
				  :opts="opts"
				  :chartData="chartData"
				/>
			</view>
		</view>
		
		<view id="thirdBlock">
			<text>评价标签</text>
			<view id="pie">
				<qiun-data-charts
				  type="pie"
				  :opts="secondOpt"
				  :chartData="secondCharData"
				/>
			</view>
		</view>
		
		<view id="fourthBlock">
			<view id="folderBox">
				<text id="title">测试评价</text>
				<text class="tip" id="close" v-show="!hide" @click="hide=!hide">折叠</text>
				<text class="tip" id="open" v-show="hide" @click="hide=!hide">展开</text>
			</view>
			<view id="commentBox" v-show="!hide">
				<view class="comment" v-for="comment in TestData.tests" :key="comment.id">
					<view class="commentInfo">
						<image :src="base_url+comment.user.avatar" mode="aspectFill"></image>
						<text class="name">{{comment.user.username}}</text>
						<text class="publishTime">{{comment.publish_time}}</text>
						<text class="content">{{comment.feeling}}</text>
					</view>
					<view class="image" v-if="comment.image_list.length != 0">
						<image :src="base_url+image" mode="aspectFill" v-for="image in comment.images"></image>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import {ref} from "vue";
	import {onLoad} from '@dcloudio/uni-app'
	import createRequest from '@/network.js';
	
	let base_url = ref("")
	let score = ref(0)
	let token = ref("")
	const hide = ref(false)
	const commentText = ref("")
	const currentItemId = ref(0)
	
	uni.getStorage({
		key:"baseUrl",
		success: (res) => {
			base_url.value = res.data
		}
	})
	
	const TestData = ref({
		'image_list':[""],
		'product_name':"",
		'publish_by':{
			"username":""
		},
		'start_time':"",
		'end_time':"",
	})
	const chartData = ref({})
	const opt = ref({
	    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
	    padding: [15,30,0,5],
	    enableScroll: false,
	    legend: {},
	    xAxis: {
	      boundaryGap: "justify",
	      disableGrid: false,
	      min: 0,
	      axisLine: false,
	      max: 40
	    },
	    yAxis: {},
	    extra: {
	      bar: {
	        type: "group",
	        width: 10,
	        meterBorde: 1,
	        meterFillColor: "#FFFFFF",
	        activeBgColor: "#000000",
	        activeBgOpacity: 0.08,
	        linearType: "custom",
	        barBorderCircle: true,
	        seriesGap: 1,
	        categoryGap: 6
	      }
	    }
	  })
	
	
	const secondCharData = ref({})
	const secondOpt = ref({
	    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
	    padding: [5,5,5,5],
	    enableScroll: false,
	    extra: {
	      pie: {
	        activeOpacity: 0.5,
	        activeRadius: 10,
	        offsetAngle: 0,
	        labelWidth: 15,
	        border: false,
	        borderWidth: 3,
	        borderColor: "#FFFFFF"
	      }
	    }
	  })
	  
	  
	
	onLoad((option)=>{
		currentItemId.value = option.itemId
		score.value = parseInt(option.score)
		console.log(score.value)
		
		
		uni.getStorage({
			key:"token",
			success: (res) => {
				token.value = res.data
			}
		})
		// 调用网络请求
		createRequest("/product/productDetail/"+currentItemId.value,"GET",{
					'Content-Type': 'application/json'
				},{}).then((data) => {
					console.log(data.data)
					if (data.code == 200){
						TestData.value = data.data
						
						chartData.value = {
						    categories: Object.keys(TestData.value.skin_score_dic),
						    series: [
						      {
						        name: "总分",
						        data: Object.values(TestData.value.skin_score_dic)
						      }
						    ]
						  }
						  
						  let tagData = []
						  let tagKey = Object.keys(TestData.value.tag_dic)
						  let tagValue = Object.values(TestData.value.tag_dic)
						  
						  for (let i = 0; i < tagKey.length; i++){
						  	tagData.push({"name":tagKey[i], "value": tagValue[i]})
						  }
						  
						  secondCharData.value = {
						      series: [
						        {
						          data: tagData
						        }
						      ]
						    }
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
	
	function fullStar(score){
		return Math.floor(score)
	}
	
	function shouldShowHalfStar(score){
		return score % 1 === 0.5
	}
	
	function emptyStar(score){
		return 5 - fullStar(score) - (shouldShowHalfStar(score) ? 1 : 0); 
	}
	
	let id = 1
</script>
	

<style scoped>
	#content{
		width: 100%;
		height: 100vh;
		background-color: #f8f8f8;
	}
	
	#content #firstBlock{
		position: relative;
		padding: 40rpx;
		width: calc(100% - 80rpx);
		height: auto;
		background-color: white;
	}
	
	.AduditImage{
		opacity: 0.7;
		width: 154rpx;
		height: 154rpx;
		position: absolute;
		right: 40rpx;
		top: 20rpx;
	}
	
	#content #firstBlock #productOuter{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 160rpx;
	}
	
	#content #firstBlock #productOuter>image{
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}
	
	#content #firstBlock #productOuter #infoView{
		display: flex;
		flex-direction: column;
		width: calc(100% - 160rpx);
		height: 160rpx;
	}
	
	#rightView{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	#infoView #rightView text:nth-child(2){
		font-size: 26rpx;
		color: #707070;
	}
	
	#infoView #productName{
		margin-left: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
	
	#timeBox{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		width: calc(100% - 40rpx);
		height: 26rpx;
		margin-left: 40rpx;
	}
	
	#timeBox>text{
		color: #BFBFBF;
		font-size: 26rpx;
	}
	
	#starBox{
		margin-left: 40rpx;
		display: flex;
		width: calc(100% - 40rpx);
		height: calc(100% - 56rpx);
	}
	
	#starBox>image{
		margin-right: 10rpx;
		margin-top: 30rpx;
		width: 40rpx;
		height: 40rpx;
	}
	
	#starBox>text{
		color: #FF9D51;
		margin-top: 30rpx;
		font-size: 30rpx;
		margin-left: 40rpx;
	}
	
	#introdectionBox{
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}
	
	#introdectionBox text:first-child{
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
	}
	
	#introdectionBox text{
		display: block;
	}
	
	#introdectionBox text:nth-child(2){
		color: #707070;
		font-size: 26rpx;
	}
	
	#secondBlock{
		background-color: white;
		display: flex;
		flex-direction: column;
		padding: 40rpx;
		margin-top: 20rpx;
		width: calc(100% - 80rpx);
		height: auto;
	}
	
	#secondBlock text{
		font-weight: bold;
		font-size: 36rpx;
	}
	
	#secondBlock #bar{
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}
	
	#thirdBlock{
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		width: calc(100% - 80rpx);
		height: auto;
		background-color: white;
	}
	
	#thirdBlock>text{
		font-size: 36rpx;
		font-weight: bold;
	}
	
	#thirdBlock #pie{
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}
	
	#fourthBlock{
		display: flex;
		flex-direction: column;
		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-top: 40rpx;
		margin-top: 20rpx;
		width: calc(100% - 80rpx);
		height: auto;
		background-color: white;
	}
	
	#fourthBlock #title{
		margin-bottom: 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.comment{
		border-bottom: 1px solid #cbcbcb;
		flex-direction: column;
		margin-bottom: 40rpx;
		width: 100%;
		height: auto;
		padding-bottom: 30rpx;
	}
	
	.comment .commentInfo{
		position: relative;
		flex-direction: row;
		width: 100%;
		height: auto;
	}
	
	.commentInfo>image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	
	.commentInfo .name{
		font-size: 30rpx;
		position: absolute;
		left: 120rpx;
	}
	
	.commentInfo .publishTime{
		font-size: 26rpx;
		top: 2rpx;
		color: #908F8F;
		position: absolute;
		right: 0rpx;
	}
	
	.commentInfo .content{
		position: relative;
		left: 120rpx;
		top: -40rpx;
		width: calc(100% - 120rpx);
		display: block;
		font-size: 26rpx;
		word-wrap: break-word;
	}
	
	.comment .image{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		height: auto;
	}
	
	.comment .image>image{
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		width: 140rpx;
		height: 140rpx;
	}
	
	.comment .image>image:nth-last-child(1){
		margin-right: 0rpx;
	}

	#folderBox{
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: auto;
		align-items: center;
	}
	
	.tip{
		font-size: 30rpx;
		position: absolute;
		right: 0rpx;
		top: 0rpx;
	}
	
	#close{
		color: #908F8F;
	}
	
	#open{
		color: blue;
	}
</style>