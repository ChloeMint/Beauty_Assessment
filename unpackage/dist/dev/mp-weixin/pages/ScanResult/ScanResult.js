"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
const _sfc_main = {
  __name: "ScanResult",
  setup(__props) {
    const product = common_vendor.ref({
      "image_list": [""]
    });
    const base_url = common_vendor.ref("");
    const token = common_vendor.ref("");
    let productId = common_vendor.ref(0);
    common_vendor.onLoad((option) => {
      productId.value = option.itemId;
      network.createRequest("/product/productDetail/" + productId.value, "GET", {
        "Content-Type": "application/json"
      }, {}).then((data) => {
        if (data.code == 200) {
          product.value = data.data;
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          base_url.value = res.data;
        }
      });
      common_vendor.index.getStorage({
        key: "token",
        success: (res) => {
          token.value = res.data;
        }
      });
    });
    function comfirm() {
      network.createRequest("/test/joinedTest", "POST", {
        "Content-Type": "application/json",
        "Authorization": token.value
      }, {
        "product_id": product.value.id
      }).then((data) => {
        if (data.code == 200) {
          common_vendor.index.showToast({
            title: "加入成功",
            icon: ""
          });
          setTimeout(() => {
            common_vendor.index.navigateBack(
              { delta: 1 }
            );
          }, 1e3);
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
    }
    function cancel() {
      common_vendor.index.navigateBack(
        { delta: 1 }
      );
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(product.value.product_name),
        b: base_url.value + product.value.image_list[0],
        c: common_vendor.f(product.value.skin_list, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        d: common_vendor.o(comfirm),
        e: common_vendor.o(cancel)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a424ddc1"], ["__file", "D:/uniappProgramme/Beauty/pages/ScanResult/ScanResult.vue"]]);
wx.createPage(MiniProgramPage);
