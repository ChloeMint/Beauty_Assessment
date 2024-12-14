"use strict";
const common_vendor = require("./common/vendor.js");
function createRequest(url, method = "GET", header = {}, parameter = {}, showLoading = true) {
  let base_url = "http://192.168.114.104:5000";
  let full_url = base_url + url;
  if (method.toUpperCase() === "GET" && Object.keys(parameter).length > 0) {
    fullUrl = buildUrlWithQuery(full_url, parameter);
  }
  return new Promise((resolve, reject) => {
    if (showLoading) {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
    }
    common_vendor.index.request({
      url: full_url,
      method,
      header,
      data: method.toUpperCase() === "GET" ? null : parameter,
      success: (res) => {
        if (showLoading) {
          common_vendor.index.hideLoading();
        }
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`请求失败，状态码：${res.statusCode}`));
        }
      },
      fail: (error) => {
        if (showLoading) {
          common_vendor.index.hideLoading();
        }
        reject(error);
      }
    });
  });
}
function buildUrlWithQuery(url, params) {
  const queryString = Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
  return `${url}?${queryString}`;
}
exports.createRequest = createRequest;
