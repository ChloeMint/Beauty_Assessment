"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "auditProductCard",
  props: {
    image: String,
    name: String,
    status: Number,
    content: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.image,
        b: common_vendor.t(__props.name),
        c: __props.status == 1
      }, __props.status == 1 ? {} : {}, {
        d: __props.status == 0
      }, __props.status == 0 ? {} : {}, {
        e: common_vendor.t(__props.content)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8818eeed"], ["__file", "D:/uniappProgramme/Beauty/components/auditProductCard.vue"]]);
wx.createComponent(Component);
