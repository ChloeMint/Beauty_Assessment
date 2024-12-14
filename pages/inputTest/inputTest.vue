<template>
	<scroll-view class="content">
		<view id="name">
			<text class="title">产品名称</text>
			<text>{{dataList.product_name}}</text>
		</view>
		
		<image :src="base_url+dataList.image_list[0]" id="productImage" mode="aspectFill"></image>
	
		<text class="title">选择您的肤质</text>
		
		<view id="radioBox">
			<radio-group name="skinType" @change="changeRadio">
				<label v-for="item in dataList.skin_list">
					<radio :value="item" /><text>{{item}}</text>
				</label>
			</radio-group>
		</view>
		
		<text class="title">请选择适合该产品的标签</text>
		
		<view id="tagSelectBox">
			<text class="defaultStyle" v-for="item in tagList" @click="setSelectStyle(item)" :class="tagList[selectIndex] == item ? 'selectTag':''">{{item}}</text>
			<input type="text" placeholder="+" v-model="inputTagValue" @confirm="addTag"/>
		</view>
		
		<text class="title">使用效果图</text>
		
		<view id="selectImages">
			<view id="imageBox" v-for="item in selectedImageList">
				<image :src="item" mode="aspectFill"></image>
				<image class="deleteButton" src="../../static/删除.png" @click="deleteImage(item)"></image>
			</view>
			<image src="../../static/添加图片.png" mode="aspectFill" @click="selectImage" :class="isVisitable()? 'addImageButtonVisible':'addImageButtonInvisible'"></image>
		</view>
		
		<text class="title">请选择您的评分</text>
		<view id="score">
			<uni-rate allow-half :value="score" @change="changeScore"/>
		</view>
		
		<text class="title">使用感受</text>
		
		<view id="feeling">
			<textarea placeholder="在这里输入感受" v-model="feelings"></textarea>
		</view>
		
		<button @click="submitInfo">提交</button>
	</scroll-view>
</template>

<script setup>
	import {ref} from "vue";
	import {onLoad} from '@dcloudio/uni-app'
	import createRequest from '@/network.js';
	
	const itemId = ref()
	const selectType = ref("")
	const tagList = ref([])
	const selectIndex = ref()
	const selectedImageList = ref([])
	const inputTagValue = ref("")
	const feelings = ref("")
	let score = 0
	let base_url = ref("")
	
	
	
	
	const dataList = ref(
		{
			image_list:[""],
			skinTypes:[],
			tagList:[]
		}
	)
	
	onLoad((options)=>{
		itemId.value = options.itemId
		
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				base_url.value = res.data
			}
		})
		// 调用网络请求，赋值		
		createRequest("/product/productDetail/"+itemId.value,"GET",{
					'Content-Type': 'application/json'
				},{}).then((data) => {
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
		
		
		tagList.value = ["拔干", "滋润", "卡粉"]
	})
	
	function changeRadio(e){
		selectType.value = e.detail.value
	}
	
	function changeScore(e){
		score = e.value
	}
	
	function selectImage(){
		uni.chooseImage({
			count: 6, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				selectedImageList.value = res.tempFilePaths
			}
		});
	}
	
	function isVisitable(){
		return selectedImageList.value.length == 0
	}
	
	function deleteImage(item){
		let index = selectedImageList.value.indexOf(item)
		selectedImageList.value.splice(index, 1)
	}
	
	function addTag(){
		if(inputTagValue.value == ""){
			
		}else if (tagList.value.indexOf(inputTagValue.value) == -1){
			tagList.value.push(inputTagValue.value)
			inputTagValue.value = ""
		}else{
			uni.showToast({ title: '已添加过该标签', icon: 'none' });
		}
	}
	
	function setSelectStyle(item){
		selectIndex.value = tagList.value.indexOf(item)
	}
	
	function submitInfo(){
		if(selectType.value == ""){
			uni.showToast({ title: '您还没选择肤质', icon: 'none' });
		}else if(selectIndex.value == null){
			uni.showToast({ title: '您还没选择标签', icon: 'none' });
		}else if(feelings.value == ""){
			uni.showToast({ title: '您还没输入感受', icon: 'none' });
		}else{
			// 调用请求
			// console.log(selectType.value)
			// console.log(tagList.value[selectIndex.value])
			// console.log(feelings.value)
			// console.log(selectedImageList.value)
			// console.log(score)
			
			uni.getStorage({
				key:"token",
				success: (res) => {
					let textData = {
						"product_id":dataList.value.id,
						"skin_type":selectType.value,
						"tag":tagList.value[selectIndex.value],
						"score":score,
						"feeling":feelings.value,
					}
					
					const formData = {};
					for (let key in textData) {
					    if (textData.hasOwnProperty(key)) {
					        formData[key] = textData[key];
					    }
					}
					
					uni.uploadFile({
					    url: base_url.value+'/test/addTest', // 替换为实际的上传接口地址
					    filePath: selectedImageList.value[0],
					    name: 'files', // 后端接收文件时对应的字段名
					    formData: formData, // 额外的文本数据
						header:{
							'Authorization': res.data
						},
					    success: (uploadFileRes) => {
							let result = JSON.parse(uploadFileRes.data)
							console.log(result.code)
							if (result.code == 200){
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
	}
</script>

<style scoped>
	.content{
		padding: 40rpx;
		width: calc(100% - 80rpx);
	}
	
	.content #name{
		width: 100%;
		height: 48rpx;
	}
	
	.title{
		color: #666666;
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.content #name>text:nth-child(2){
		font-size: 30rpx;
		margin-left: 40rpx;
		color: #666666;
	}
	
	.content #productImage{
		display: block;
		margin-top: 40rpx;
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}
	
	.content #radioBox{
		margin-bottom: 40rpx;
		margin-top: 40rpx;
		width: 100%;
		height: 100rpx;
	}
	
	.content #radioBox radio-group label{
		font-size: 30rpx;
		display: inline-block;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}
	
	#radioBox label radio{
		scale: 0.7;
	}
	
	#tagSelectBox{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 40rpx;
		width: 100%;
		margin-bottom: 40rpx;
	}
	
	.defaultStyle{
		margin-bottom: 40rpx;
		margin-right: 40rpx;
		border-radius: 10rpx;
		font-size: 30rpx;
		display: inline-block;
		width: auto;
		height: 22rpx;
		padding: 20rpx;
		text-align: center;
		line-height: 22rpx;
		background-color: #EDEDED;
		color: #666666;
	}
	
	
	#tagSelectBox input{
		text-align: center;
		border-radius: 10rpx;
		width: 88rpx;
		font-size: 30rpx;
		padding: 8rpx;
		background-color: #EDEDED;
	}
	
	.content #selectImages{
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 40rpx;
		width: 100%;
	}
	
	.content #selectImages #imageBox>image{
		border-radius: 10rpx;
	}
	
	.content #selectImages image{
		width: 160rpx;
		height: 160rpx;
	}
	
	#imageBox{
		position: relative;
	}
	
	.content #selectImages .deleteButton{
		position: absolute;
		top: 5rpx;
		right: 5rpx;
		width: 40rpx;
		height: 40rpx;
	}
	
	#selectImages #imageBox{
		margin-right: 40rpx;
		margin-bottom: 40rpx;
	}
	
	
	.content #selectImages image:last-child{
		margin-right: 0rpx;
	}
	
	.content #feeling{
		border-radius: 10rpx;
		padding: 40rpx;
		margin-top: 40rpx;
		width: calc(100% - 80rpx);
		height: 260rpx;
		background-color: #EDEDED;
	}
	
	.content #score{
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		width: 100%;
		height: 50rpx;
	}
	
	.content #feeling>textarea{
		font-size: 30rpx;
		width: 100%;
	}
	
	.content button{
		margin-top: 40rpx;
		width: 100%;
		height: 92rpx;
		color: white;
		font-size: 36rpx;
		line-height: 92rpx;
		background-color: #0E68CD;
	}
	
	.selectTag{
		background-color: #E5EDFB;
		color: #0E68CD;
	}
	
	.addImageButtonVisible{
		display: block;
	}
	
	.addImageButtonInvisible{
		display: none;
	}
	
	
</style>
