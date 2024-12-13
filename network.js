function createRequest(url,method = "GET", header = {}, parameter = {}, showLoading = true){
	// 使用 Promise 封装 uni.request 请求  
	let base_url = "http://192.168.114.104:5000"
	let full_url = base_url+url
	
	if (method.toUpperCase() === 'GET' && Object.keys(parameter).length > 0) {  // 这里网络调用传递的参数是同一个列表
	        fullUrl = buildUrlWithQuery(full_url, parameter);  
	} 
	return new Promise((resolve, reject) => {
		if (showLoading){
			uni.showLoading({
				title:"加载中..."
			})
		}
	    uni.request({  
	        url: full_url,  
	        method: method,  
	        header: header,  
			data: method.toUpperCase() === 'GET' ? null : parameter,
	        success: (res) => {  
	            // 成功时解析响应数据  
				if (showLoading){
					uni.hideLoading()
				}
	            if (res.statusCode === 200) {  
	                resolve(res.data); // 解析响应数据  
	            } else {  
					reject(new Error(`请求失败，状态码：${res.statusCode}`));  
	            }  
	        },  
	        fail: (error) => {  
				if(showLoading){
					uni.hideLoading()
				}
	            // 请求失败时拒绝 Promise  
	            reject(error);  
	        }  
	    });  
	})
}

function buildUrlWithQuery(url, params) {  
    const queryString = Object.keys(params)  
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)  
        .join('&');  
  
    return `${url}?${queryString}`;  
}  

export default createRequest;