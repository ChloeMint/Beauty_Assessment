"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "share",
  setup(__props) {
    const itemId = common_vendor.ref(0);
    const codeImage = common_vendor.ref("");
    let base_url = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      itemId.value = options.itemId;
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          base_url.value = res.data;
          codeImage.value = base_url.value + "/generate_qr/" + itemId.value;
        }
      });
    });
    function reload() {
      codeImage.value = base_url.value + "/generate_qr/" + itemId.value;
    }
    return (_ctx, _cache) => {
      return {
        a: codeImage.value,
        b: common_vendor.o(reload)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ceb22cc9"], ["__file", "D:/uniappProgramme/Beauty/pages/share/share.vue"]]);
wx.createPage(MiniProgramPage);
