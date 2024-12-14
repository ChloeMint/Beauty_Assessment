"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
const _sfc_main = {
  __name: "ChangeUsername",
  setup(__props) {
    const username = common_vendor.ref("");
    let token = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      common_vendor.index.getStorage({
        key: "token",
        success: (res) => {
          token.value = res.data;
        }
      });
    });
    function finish() {
      if (username.value == "") {
        common_vendor.index.showToast({ title: "您没有输入任何内容", icon: "none" });
      } else {
        network.createRequest("/user/changeUsername", "POST", {
          "Content-Type": "application/json",
          "Authorization": token.value
        }, {
          "username": username.value
        }).then((data) => {
          console.log(data);
          if (data.code == 200) {
            common_vendor.index.setStorage({
              key: "username",
              data: username.value
            });
            common_vendor.index.showToast({ title: "设置成功" });
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
    }
    return (_ctx, _cache) => {
      return {
        a: username.value,
        b: common_vendor.o(($event) => username.value = $event.detail.value),
        c: common_vendor.o(($event) => finish())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e253ba41"], ["__file", "D:/uniappProgramme/Beauty/pages/ChangeUsername/ChangeUsername.vue"]]);
wx.createPage(MiniProgramPage);
