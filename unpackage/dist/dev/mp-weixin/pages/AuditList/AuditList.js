"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
if (!Math) {
  testProductCard();
}
const testProductCard = () => "../../components/testProductCard.js";
const _sfc_main = {
  __name: "AuditList",
  setup(__props) {
    let base_url = common_vendor.ref("");
    const join = common_vendor.ref([]);
    let token = common_vendor.ref("");
    common_vendor.onShow((option) => {
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
          getData(res.data);
        }
      });
    });
    function getData(token2) {
      network.createRequest("/product/notAuditProduct", "GET", {
        "Content-Type": "application/json",
        "Authorization": token2
      }, {}).then((data) => {
        console.log(data.data);
        if (data.code == 200) {
          join.value = data.data;
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
    }
    function turnToAuditDetail(itemId, score) {
      common_vendor.index.navigateTo({
        url: "/pages/AuditDetail/AuditDetail?itemId=" + itemId + "&score=" + score
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(join.value, (item, k0, i0) => {
          return {
            a: "179bf8ea-0-" + i0,
            b: common_vendor.p({
              image: common_vendor.unref(base_url) + item.image_list[0],
              name: item.product_name,
              startTime: item.start_time,
              endTime: item.end_time,
              content: item.product_introduce
            }),
            c: item.id,
            d: common_vendor.o(($event) => turnToAuditDetail(item.id, item.avg_score), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-179bf8ea"], ["__file", "D:/uniappProgramme/Beauty/pages/AuditList/AuditList.vue"]]);
wx.createPage(MiniProgramPage);
