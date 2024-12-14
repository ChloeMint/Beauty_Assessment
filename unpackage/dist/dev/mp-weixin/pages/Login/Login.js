"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
const _sfc_main = {
  __name: "Login",
  setup(__props) {
    const phone = common_vendor.ref("");
    const pwd = common_vendor.ref("");
    function login() {
      if (phone.value == "") {
        common_vendor.index.showToast({ title: "您还未输入手机号", icon: "none" });
        return;
      }
      if (pwd.value == "") {
        common_vendor.index.showToast({ title: "您还未输入密码", icon: "none" });
        return;
      }
      if (!/^[0-9]{11}$/.test(phone.value)) {
        common_vendor.index.showToast({ title: "请输入正确手机号", icon: "none" });
        return;
      }
      network.createRequest("/user/login", "POST", {
        "Content-Type": "application/json"
      }, {
        "phone": phone.value,
        "password": pwd.value
      }).then((data) => {
        if (data.code == 200) {
          common_vendor.index.setStorage({
            key: "token",
            data: data.data
          });
          common_vendor.index.setStorage({
            key: "baseUrl",
            data: "http://192.168.114.104:5000"
          });
          common_vendor.index.showToast({ title: "登录成功！", icon: "none" });
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
    }
    function forgotPwd() {
      common_vendor.index.navigateTo({
        url: "/pages/forgetPassword/forgetPassword"
      });
    }
    function turnToRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: phone.value,
        b: common_vendor.o(($event) => phone.value = $event.detail.value),
        c: pwd.value,
        d: common_vendor.o(($event) => pwd.value = $event.detail.value),
        e: common_vendor.o(($event) => forgotPwd()),
        f: common_vendor.o(login),
        g: common_vendor.o(($event) => turnToRegister())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniappProgramme/Beauty/pages/Login/Login.vue"]]);
wx.createPage(MiniProgramPage);
