"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "testProductCard",
  props: {
    image: String,
    name: String,
    startTime: String,
    endTime: String,
    content: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.image,
        b: common_vendor.t(__props.name),
        c: common_vendor.t(__props.startTime),
        d: common_vendor.t(__props.endTime),
        e: common_vendor.t(__props.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a39ac6f3"], ["__file", "D:/uniappProgramme/Beauty/components/testProductCard.vue"]]);
wx.createComponent(Component);
