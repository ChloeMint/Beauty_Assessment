<template>
	<view class="content">
		<view id="nameBox">
			<text class="title">产品名称</text>
			<input type="text" placeholder="请输入测评产品名称" placeholder-style="color:#BFBFBF" v-model="inputName"/>
		</view>
		
		<view id="typeBox">
			<text class="title">产品类型</text>
			<view id="productTypeTagBox">
				<text v-for="item in productType" @click="selectProductType = item" :class="isSelectedStyle(item)? 'select-color':'notSelect'">{{item}}</text>
			</view>
		</view>
		
		<text class="title">产品图</text>
		
		<view id="pictureBox">
			<view class="imageBox" v-for="item in selectedImage">
				<image :src="item" mode="aspectFill"></image>
				<image class="deleteButton" src="../../static/删除.png" @click="deleteImage(item)"></image>
			</view>
			
			<image src="../../static/添加图片.png" mode="aspectFill" @click="selectImage" :class="isVisitable()? 'addImageButtonVisible':'addImageButtonInvisible'"></image>
		</view>
		<text class="title">使用方式</text>
		<textarea id="feeling" placeholder="请输入使用方式" placeholder-style="font-size: 30rpx" v-model="feeling"></textarea>
		
		<text class="title">测评分组</text>
		<checkbox-group name="skinType" id="skinTypeBox" @change="getGroupList">
			<label v-for="item in testGroup">
				<checkbox :value="item" /><text>{{item}}</text>
			</label>
			<input type="text" v-model="inputSkinType">
		</checkbox-group>
		
		<text class="title">起始时间</text>
		<view id="limitTime">
			<uni-datetime-picker type="daterange" @change="maskClick" />
		</view>
		
		<button id="commit" @click="submit">提交</button>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import {onLoad} from '@dcloudio/uni-app'
	
	const productType = ref(["彩妆", "清洁", "护理"])
	const selectProductType = ref("")
	const selectedImage = ref([])
	const inputName = ref("")
	const feeling = ref("")
	const testGroup = ref(["所有肤质", "油性皮", "干性皮", "混合皮", "敏感皮", "中性皮", "其他"])
	const selectedTestGroup = ref([])
	const inputSkinType = ref("")
	const dateRange = ref([])
	let base_url = ref("")
	
	onLoad((options)=>{
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				base_url.value = res.data
			}
		})
	})
	
	function isSelectedStyle(item){
		return item == selectProductType.value
	}
	
	function deleteImage(item){
		let index = selectedImage.value.indexOf(item)
		selectedImage.value.splice(index, 1)
	}
	
	function selectImage(){
		uni.chooseImage({
			count: 6, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				selectedImage.value = res.tempFilePaths
			}
		});
	}
	
	function isVisitable(){
		return selectedImage.value.length == 0
	}
	
	function getGroupList(e){
		selectedTestGroup.value = e.detail.value
		if(selectedTestGroup.value.indexOf("其他") !== -1){
			let index = selectedTestGroup.value.indexOf("其他")
			selectedTestGroup.value[index] = inputSkinType.value
		}
	}
	
	function maskClick(e){
		dateRange.value = e
	}
	
	function isPast(time){
		let date = new Date()
		let nowYear = date.getFullYear()
		let nowMonth = date.getMonth()
		let nowDay = date.getDate()
		
		let parts = time.split('-');  
		let year = parseInt(parts[0])
		let month = parseInt(parts[1]) - 1
		let day = parseInt(parts[2])
		
		if(nowYear > year){
			return true;
		}
		
		if(nowYear == year && nowMonth>month){
			return true;
		}
		
		if(nowYear == year && nowMonth == month && nowDay>day){
			return true;
		}
		
		return false;
	}
	
	function submit(){
		if (inputName.value == ""){
			uni.showToast({ title: '您还没有输入测评产品名称', icon: 'none' });
		}else if(selectProductType.value == ""){
			uni.showToast({ title: '您还没有选择产品类型', icon: 'none' });
		}else if (selectedImage.value.length == 0){
			uni.showToast({ title: '您还没有上传产品图', icon: 'none' });
		}else if(feeling.value == ""){
			uni.showToast({ title: '您还没有输入产品使用方式', icon: 'none' });
		}else if(selectedTestGroup.value.length == 0){
			uni.showToast({ title: '您还没有选择测评分组', icon: 'none' });
		}else if(dateRange.value.length == 0){
			uni.showToast({ title: '您没有选择起始时间', icon: 'none' });
		}else if(isPast(dateRange.value[0])){
			uni.showToast({ title: '无法选择过去的日期作为起始时间', icon: 'none' });
		}else{
			// 发送网络请求
			uni.getStorage({
				key:"token",
				success: (res) => {
					let textData = {
						"type":selectProductType.value,
						"product_name":inputName.value,
						"start_time":dateRange.value[0].replace(/-/g, '.'),
						"end_time":dateRange.value[1].replace(/-/g, '.'),
						"product_introduce":feeling.value,
						'skin_type':JSON.stringify(selectedTestGroup.value.toString().split(","))
					}
					
					const formData = {};
					for (let key in textData) {
					    if (textData.hasOwnProperty(key)) {
					        formData[key] = textData[key];
					    }
					}
					
					uni.uploadFile({
					    url: base_url.value+'/product/create', // 替换为实际的上传接口地址
					    filePath: selectedImage.value[0],
					    name: 'files', // 后端接收文件时对应的字段名
					    formData: formData, // 额外的文本数据
						header:{
							'Authorization': res.data
						},
					    success: (uploadFileRes) => {
					        console.log('Upload success:', uploadFileRes.data);
					        // 在这里处理上传成功的逻辑
							uni.showToast({ title: '提交成功', icon: 'none' });
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							}, 500)
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
	}
	
	
	
	
</script>

<style scoped>
	.content{
		padding: 40rpx;
	}
	
	.content #nameBox{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
	}
	
	.content #nameBox>input{
		width: calc(100% - 40rpx - 144rpx);
		margin-left: 40rpx;		
		color: black;
		border-bottom: 2rpx solid #BFBFBF;
		font-size: 30rpx;
	}
	
	.title{
		font-size: 36rpx;
		color: #666666;
		font-weight: bold;
	}
	
	.content #typeBox{
		margin-top: 40rpx;
		width: 100%;
		height: 52rpx;
		display: flex;
		flex-direction: row;
		margin-bottom: 40rpx;
	}
	
	.content #typeBox #productTypeTagBox{
		margin-left: 40rpx;
		width: calc(100% - 40rpx - 144rpx);
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	
	.content #typeBox #productTypeTagBox>text{
		text-align: center;
		line-height: 52rpx;
		display: block;
		width: 108rpx;
		height: 52rpx;
		font-size: 30rpx;
		margin-right: 40rpx;
		border-radius: 10rpx;
	}
	
	.content #typeBox #productTypeTagBox>text:last-child{
		margin-right: 0rpx;
	}
	
	.notSelect{
		background-color: #EDEDED;
		color: #666666;
	}
	
	.select-color{
		background-color: #E5EDFB;
		color: #0E68CD;
	}
	
	.content #pictureBox{
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}
	
	.content #pictureBox>view{
		position: relative;
		margin-right: 40rpx;
		margin-bottom: 40rpx;
	}
	
	.content #pictureBox image{
		width: 160rpx;
		height: 160rpx;
		border-radius: 10rpx;
	}
	
	.content #pictureBox .imageBox .deleteButton{
		position: absolute;
		top: 5rpx;
		right: 5rpx;
		width: 40rpx;
		height: 40rpx;
	}
	
	.addImageButtonVisible{
		display: block;
	}
	
	.addImageButtonInvisible{
		display: none;
	}
	
	#feeling{
		font-size: 30rpx;
		padding: 40rpx;
		border-radius: 10rpx;
		margin-top: 40rpx;
		width: calc(100% - 80rpx);
		min-height: 300rpx;
		height: auto;
		background-color: #EDEDED;
		margin-bottom: 40rpx;
	}
	
	#skinTypeBox{
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}
	
	#skinTypeBox>label{
		margin-right: 40rpx;
		margin-bottom: 20rpx;
		font-size: 30rpx;
		display: block;
	}
	
	
	
	#skinTypeBox>label>checkbox{
		scale: 0.75;
	}
	
	
	#skinTypeBox>input{
		width: 200rpx;
		height: 40rpx;
		margin-left: -20rpx;
		border-bottom: 2rpx solid #707070;
	}
	
	#limitTime{
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}
	
	#commit{
		font-size: 36rpx;
		margin-top: 40rpx;
		width: 100%;
		height: 82rpx;
		line-height: 82rpx;
		background-color: #0E68CD;
		color: white;
	}
</style>
