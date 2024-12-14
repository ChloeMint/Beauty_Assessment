<template>
	<view class="content">
		<view id="codeImageBox">
			<image :src="codeImage" mode="" @click="reload"></image>
		</view>
		<text>扫扫二维码，一起加入我们的测评小组叭~</text>
	</view>
</template>

<script setup>
	import {ref} from "vue";
	import {onLoad} from '@dcloudio/uni-app'
	import createRequest from '@/network.js';
	const itemId = ref(0)
	const codeImage = ref("")
	let base_url = ref("")
	
	onLoad((options)=>{
		itemId.value = options.itemId
		uni.getStorage({
			key:"baseUrl",
			success: (res) => {
				base_url.value = res.data
				codeImage.value = base_url.value+"/generate_qr/"+itemId.value
			}
		})
		
	})
	
	function reload(){
		codeImage.value = base_url.value+"/generate_qr/"+itemId.value
	}
</script>

<style scoped>
	.content{
		width: 100%;
		height: 100vh;
	}
	
	.content #codeImageBox{
		width: 100%;
		height: 60%;
	}
	
	.content #codeImageBox>image{
		margin: calc(50% - 265rpx) calc(50% - 265rpx);
		width: 530rpx;
		height: 530rpx;
	}
	
	.content>text{
		font-size: 30rpx;
		color: #666666;
		text-align: center;
		display: block;
		margin: 0rpx auto;
	}
</style>
