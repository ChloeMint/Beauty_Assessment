"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "productCard",
  props: {
    image: String,
    name: String,
    tags: Array,
    score: Number,
    endTime: String
  },
  setup(__props) {
    function fullStar(score) {
      return Math.floor(score);
    }
    function shouldShowHalfStar(score) {
      return score % 1 === 0.5;
    }
    function emptyStar(score) {
      return 5 - fullStar(score) - (shouldShowHalfStar(score) ? 1 : 0);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.image,
        b: common_vendor.t(__props.name),
        c: common_vendor.f(__props.tags, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag)
          };
        }),
        d: common_vendor.f(fullStar(__props.score), (starCount, k0, i0) => {
          return {};
        }),
        e: shouldShowHalfStar(__props.score)
      }, shouldShowHalfStar(__props.score) ? {} : {}, {
        f: common_vendor.f(emptyStar(__props.score), (emptyCount, k0, i0) => {
          return {};
        }),
        g: common_vendor.t(__props.score.toFixed(1)),
        h: common_vendor.t(__props.endTime)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44877ebc"], ["__file", "D:/uniappProgramme/Beauty/components/productCard.vue"]]);
wx.createComponent(Component);
