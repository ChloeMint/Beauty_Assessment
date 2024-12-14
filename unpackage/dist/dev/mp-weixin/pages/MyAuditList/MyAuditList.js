"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
if (!Math) {
  auditProductCard();
}
const auditProductCard = () => "../../components/auditProductCard.js";
const _sfc_main = {
  __name: "MyAuditList",
  setup(__props) {
    let base_url = common_vendor.ref("");
    let token = common_vendor.ref("");
    common_vendor.index.getStorage({
      key: "baseUrl",
      success: (res) => {
        base_url.value = res.data;
      }
    });
    const join = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      common_vendor.index.getStorage({
        key: "token",
        success: (res) => {
          token.value = res.data;
          network.createRequest("/test/getPublishedBySelf", "GET", {
            "Content-Type": "application/json",
            "Authorization": token.value
          }, {}).then((data) => {
            console.log(data);
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
      });
    });
    function turnToAuditResult(itemId, score) {
      common_vendor.index.navigateTo({
        url: "/pages/AduditResult/AduditResult?itemId=" + itemId + "&score=" + score
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(join.value, (item, k0, i0) => {
          return {
            a: "657c4d67-0-" + i0,
            b: common_vendor.p({
              image: common_vendor.unref(base_url) + item.image_list[0],
              name: item.product_name,
              status: item.status,
              content: item.product_introduce
            }),
            c: item.id,
            d: common_vendor.o(($event) => turnToAuditResult(item.id, item.avg_score), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-657c4d67"], ["__file", "D:/uniappProgramme/Beauty/pages/MyAuditList/MyAuditList.vue"]]);
wx.createPage(MiniProgramPage);
