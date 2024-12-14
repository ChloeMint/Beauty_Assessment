"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const phone = common_vendor.ref("");
    const pwdOne = common_vendor.ref("");
    const pwdTwo = common_vendor.ref("");
    function turnToLogin() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    function register() {
      if (phone.value == "") {
        common_vendor.index.showToast({ title: "您还未输入手机号", icon: "none" });
        return;
      }
      if (pwdOne.value == "") {
        common_vendor.index.showToast({ title: "您的密码为空", icon: "none" });
        return;
      }
      if (pwdTwo.value == "") {
        common_vendor.index.showToast({ title: "您的确认密码为空", icon: "none" });
        return;
      }
      if (!/^[0-9]{11}$/.test(phone.value)) {
        common_vendor.index.showToast({ title: "请输入正确手机号", icon: "none" });
        return;
      }
      if (pwdOne.value != pwdTwo.value) {
        common_vendor.index.showToast({ title: "两次输入的密码不同", icon: "none" });
        return;
      }
      network.createRequest("/user/register", "POST", {
        "Content-Type": "application/json"
      }, {
        "phone": phone.value,
        "password": pwdTwo.value
      }).then((data) => {
        console.log(data);
        if (data.code == 200) {
          common_vendor.index.showToast({ title: "注册成功" });
          setTimeout(() => {
            common_vendor.index.navigateBack({
              delta: 1
            });
          }, 500);
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
    }
    return (_ctx, _cache) => {
      return {
        a: phone.value,
        b: common_vendor.o(($event) => phone.value = $event.detail.value),
        c: pwdOne.value,
        d: common_vendor.o(($event) => pwdOne.value = $event.detail.value),
        e: pwdTwo.value,
        f: common_vendor.o(($event) => pwdTwo.value = $event.detail.value),
        g: common_vendor.o(($event) => register()),
        h: common_vendor.o(($event) => turnToLogin())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniappProgramme/Beauty/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
