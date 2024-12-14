"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
const _sfc_main = {
  __name: "notCompleteItemDetail",
  setup(__props) {
    const itemId = common_vendor.ref(0);
    const buttonDisabled = common_vendor.ref(true);
    let base_url = common_vendor.ref("");
    common_vendor.index.getStorage({
      key: "baseUrl",
      success: (res) => {
        base_url.value = res.data;
      }
    });
    const product = common_vendor.ref({});
    common_vendor.onLoad((option) => {
      itemId.value = option.itemId;
      network.createRequest("/product/productDetail/" + itemId.value, "GET", {
        "Content-Type": "application/json"
      }, {}).then((data) => {
        if (data.code == 200) {
          console.log(data.data);
          product.value = data.data;
          buttonDisabled.value = isFutureTime(product.value.start_time);
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
    });
    function turnToSharePage(itemId2) {
      console.log(itemId2);
      common_vendor.index.navigateTo({
        url: "/pages/share/share?itemId=" + itemId2
      });
    }
    function turnToInputTest() {
      common_vendor.index.navigateTo({
        url: "/pages/inputTest/inputTest?itemId=" + itemId.value
      });
    }
    function isFutureTime(time) {
      let date = new Date();
      let nowYear = date.getFullYear();
      let nowMonth = date.getMonth();
      let nowDay = date.getDate();
      let parts = time.split(".");
      let year = parseInt(parts[0]);
      let month = parseInt(parts[1]) - 1;
      let day = parseInt(parts[2]);
      if (nowYear < year) {
        return true;
      }
      if (nowYear == year && nowMonth < month) {
        return true;
      }
      if (nowYear == year && nowMonth == month && nowDay < day) {
        return true;
      }
      return false;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(product.value.product_name),
        b: common_vendor.o(($event) => turnToSharePage(product.value.id)),
        c: common_vendor.t(product.value.type),
        d: common_vendor.f(product.value.image_list, (image, k0, i0) => {
          return {
            a: common_vendor.unref(base_url) + image
          };
        }),
        e: common_vendor.t(product.value.product_introduce),
        f: common_vendor.f(product.value.skin_list, (skinType, k0, i0) => {
          return {
            a: common_vendor.t(skinType)
          };
        }),
        g: common_vendor.t(product.value.start_time),
        h: common_vendor.t(product.value.end_time),
        i: common_vendor.o(turnToInputTest),
        j: buttonDisabled.value,
        k: common_vendor.n(buttonDisabled.value ? "" : "selectStyleButton")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d81d7933"], ["__file", "D:/uniappProgramme/Beauty/pages/notCompleteItemDetail/notCompleteItemDetail.vue"]]);
wx.createPage(MiniProgramPage);
