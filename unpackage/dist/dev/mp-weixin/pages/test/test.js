"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
if (!Math) {
  testProductCard();
}
const testProductCard = () => "../../components/testProductCard.js";
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const publishShow = common_vendor.ref(false);
    const joinShow = common_vendor.ref(false);
    let base_url = common_vendor.ref("");
    const selfPublish = common_vendor.ref([]);
    const join = common_vendor.ref([]);
    const token = common_vendor.ref("");
    common_vendor.onLoad((option) => {
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
      network.createRequest("/test/getPublishedBySelf", "GET", {
        "Content-Type": "application/json",
        "Authorization": token2
      }, {}).then((data) => {
        if (data.code == 200) {
          selfPublish.value = data.data;
          common_vendor.index.stopPullDownRefresh();
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
      network.createRequest("/test/getJoinedBySelf", "GET", {
        "Content-Type": "application/json",
        "Authorization": token2
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
    common_vendor.onPullDownRefresh(() => {
      getData(token.value);
    });
    function parseCustomDateString(dateString) {
      let dateStringList = dateString.split(".");
      dateStringList[0];
      let month = parseInt(dateStringList[1]);
      if (month <= 10) {
        let realMonth = month;
        month = "0" + realMonth;
      }
      let day = dateStringList[2];
      if (parseInt(day) < 10) {
        day = "0" + day;
      }
      let newDateString = dateStringList[0] + "-" + month + "-" + day + " 23:59:59";
      let date = new Date(newDateString);
      let now = new Date();
      return now.getTime() > date.getTime();
    }
    function turnToDetail(id, endTime, score) {
      if (parseCustomDateString(endTime)) {
        common_vendor.index.navigateTo({
          url: "/pages/ItemDetail/ItemDetail?itemId=" + id + "&score=" + score
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/notCompleteItemDetail/notCompleteItemDetail?itemId=" + id
        });
      }
    }
    function turnToNewTest() {
      common_vendor.index.navigateTo({
        url: "/pages/newTest/newTest"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(turnToNewTest),
        b: common_vendor.n(publishShow.value ? "rotate" : ""),
        c: common_vendor.o(($event) => publishShow.value = !publishShow.value),
        d: publishShow.value
      }, publishShow.value ? {
        e: common_vendor.f(selfPublish.value, (item, k0, i0) => {
          return {
            a: "727d09f0-0-" + i0,
            b: common_vendor.p({
              image: common_vendor.unref(base_url) + item.image_list[0],
              name: item.product_name,
              startTime: item.start_time,
              content: item.product_introduce,
              endTime: item.end_time
            }),
            c: item.id,
            d: common_vendor.o(($event) => turnToDetail(item.id, item.end_time, item.avg_score), item.id)
          };
        })
      } : {}, {
        f: common_vendor.n(joinShow.value ? "rotate" : ""),
        g: common_vendor.o(($event) => joinShow.value = !joinShow.value),
        h: joinShow.value
      }, joinShow.value ? {
        i: common_vendor.f(join.value, (item, k0, i0) => {
          return {
            a: "727d09f0-1-" + i0,
            b: common_vendor.p({
              image: common_vendor.unref(base_url) + item.image_list[0],
              name: item.product_name,
              startTime: item.start_time,
              content: item.product_introduce,
              endTime: item.end_time
            }),
            c: item.id,
            d: common_vendor.o(($event) => turnToDetail(item.id, item.end_time, item.avg_score), item.id)
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727d09f0"], ["__file", "D:/uniappProgramme/Beauty/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
