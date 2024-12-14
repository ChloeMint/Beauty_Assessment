"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
if (!Math) {
  productCard();
}
const productCard = () => "../../components/productCard.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const searchName = common_vendor.ref("");
    const dataList = common_vendor.ref([]);
    const base_url = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          base_url.value = res.data;
        }
      });
    });
    function search() {
      network.createRequest("/product/search/" + searchName.value, "GET", {
        "Content-Type": "application/json"
      }, {}).then((data) => {
        console.log(data);
        if (data.code == 200) {
          dataList.value = data.data;
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
    }
    function turnToDetail(itemId, score) {
      common_vendor.index.navigateTo({
        url: "/pages/ItemDetail/ItemDetail?itemId=" + itemId + "&score=" + score
      });
    }
    return (_ctx, _cache) => {
      return {
        a: searchName.value,
        b: common_vendor.o(($event) => searchName.value = $event.detail.value),
        c: common_vendor.o(search),
        d: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: "c10c040c-0-" + i0,
            b: common_vendor.p({
              image: base_url.value + item.image_list[0],
              name: item.product_name,
              tags: item.tag_list,
              score: item.avg_score,
              endTime: item.end_time
            }),
            c: item.id,
            d: common_vendor.o(($event) => turnToDetail(item.id, item.avg_score), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/uniappProgramme/Beauty/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
