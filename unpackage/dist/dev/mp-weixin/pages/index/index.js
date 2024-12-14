"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
if (!Array) {
  const _component_View = common_vendor.resolveComponent("View");
  _component_View();
}
if (!Math) {
  productCard();
}
const productCard = () => "../../components/productCard.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tabList = common_vendor.ref(
      [
        {
          id: 1,
          name: "彩妆"
        },
        {
          id: 2,
          name: "清洁"
        },
        {
          id: 3,
          name: "护理"
        }
      ]
    );
    let base_url = common_vendor.ref("");
    const dataList = common_vendor.ref([]);
    common_vendor.onLoad((option) => {
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          base_url.value = res.data;
        }
      });
      common_vendor.index.getStorage({
        key: "token",
        success: function(res) {
          network.createRequest("/user/getUserInfo", "GET", {
            "Content-Type": "application/json",
            "Authorization": res.data
          }, {}, false).then((data) => {
            if (data.code == 200) {
              let user = data.data;
              common_vendor.index.setStorage({
                key: "permissions",
                data: user.permissions
              });
              common_vendor.index.setStorage({
                key: "username",
                data: user.username
              });
              common_vendor.index.setStorage({
                key: "avatar",
                data: user.avatar
              });
              common_vendor.index.setStorage({
                key: "userId",
                data: user.id
              });
            }
          }).catch((error) => {
            console.error("请求失败:", error);
          });
        }
      });
      getData("makeUp");
    });
    function getData(productType) {
      network.createRequest("/product/" + productType, "GET", {
        "Content-Type": "application/json"
      }, {}, false).then((data) => {
        if (data.code == 200) {
          dataList.value = data.data;
        }
      }).catch((error) => {
        console.error("请求失败:", error);
      });
    }
    let clickItemIndex = common_vendor.ref("");
    function chooseTab(index) {
      clickItemIndex.value = index;
      if (index == 0) {
        getData("makeUp");
      } else if (index == 1) {
        getData("clean");
      } else {
        getData("care");
      }
    }
    function turnToSearchPage() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
    function turnToItemDetail(itemId, score) {
      let url = "/pages/ItemDetail/ItemDetail?itemId=" + itemId + "&score=" + score;
      common_vendor.index.navigateTo({
        url
      });
    }
    function turnToScanCode() {
      common_vendor.index.scanCode({
        success: function(res) {
          common_vendor.index.showToast({ title: "扫描成功", icon: "none" });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/ScanResult/ScanResult?itemId=" + res.result
            });
          }, 1e3);
        },
        fail: function(err) {
          console.log(err);
          common_vendor.index.showToast({ title: "扫描失败，二维码无效", icon: "none" });
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(turnToSearchPage),
        b: common_vendor.o(turnToScanCode),
        c: common_vendor.p({
          id: "outer"
        }),
        d: common_vendor.f(tabList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.id,
            c: common_vendor.o(($event) => chooseTab(index), item.id),
            d: common_vendor.n(common_vendor.unref(clickItemIndex) == index ? "itemSelect" : "")
          };
        }),
        e: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: "1cf27b2a-1-" + i0,
            b: common_vendor.p({
              image: common_vendor.unref(base_url) + item.image_list[0],
              name: item.product_name,
              tags: item.tag_list,
              score: item.avg_score,
              endTime: item.startDate
            }),
            c: item.id,
            d: common_vendor.o(($event) => turnToItemDetail(item.id, item.avg_score), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/uniappProgramme/Beauty/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
