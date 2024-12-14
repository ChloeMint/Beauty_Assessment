"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
const _sfc_main = {
  __name: "AduditResult",
  setup(__props) {
    let base_url = common_vendor.ref("");
    let score = common_vendor.ref(0);
    let token = common_vendor.ref("");
    const hide = common_vendor.ref(false);
    common_vendor.ref("");
    const currentItemId = common_vendor.ref(0);
    common_vendor.index.getStorage({
      key: "baseUrl",
      success: (res) => {
        base_url.value = res.data;
      }
    });
    const TestData = common_vendor.ref({
      "image_list": [""],
      "product_name": "",
      "publish_by": {
        "username": ""
      },
      "start_time": "",
      "end_time": ""
    });
    const chartData = common_vendor.ref({});
    common_vendor.ref({
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [15, 30, 0, 5],
      enableScroll: false,
      legend: {},
      xAxis: {
        boundaryGap: "justify",
        disableGrid: false,
        min: 0,
        axisLine: false,
        max: 40
      },
      yAxis: {},
      extra: {
        bar: {
          type: "group",
          width: 10,
          meterBorde: 1,
          meterFillColor: "#FFFFFF",
          activeBgColor: "#000000",
          activeBgOpacity: 0.08,
          linearType: "custom",
          barBorderCircle: true,
          seriesGap: 1,
          categoryGap: 6
        }
      }
    });
    const secondCharData = common_vendor.ref({});
    const secondOpt = common_vendor.ref({
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [5, 5, 5, 5],
      enableScroll: false,
      extra: {
        pie: {
          activeOpacity: 0.5,
          activeRadius: 10,
          offsetAngle: 0,
          labelWidth: 15,
          border: false,
          borderWidth: 3,
          borderColor: "#FFFFFF"
        }
      }
    });
    common_vendor.onLoad((option) => {
      currentItemId.value = option.itemId;
      score.value = parseInt(option.score);
      console.log(score.value);
      common_vendor.index.getStorage({
        key: "token",
        success: (res) => {
          token.value = res.data;
        }
      });
      network.createRequest("/product/productDetail/" + currentItemId.value, "GET", {
        "Content-Type": "application/json"
      }, {}).then((data) => {
        console.log(data.data);
        if (data.code == 200) {
          TestData.value = data.data;
          chartData.value = {
            categories: Object.keys(TestData.value.skin_score_dic),
            series: [
              {
                name: "总分",
                data: Object.values(TestData.value.skin_score_dic)
              }
            ]
          };
          let tagData = [];
          let tagKey = Object.keys(TestData.value.tag_dic);
          let tagValue = Object.values(TestData.value.tag_dic);
          for (let i = 0; i < tagKey.length; i++) {
            tagData.push({ "name": tagKey[i], "value": tagValue[i] });
          }
          secondCharData.value = {
            series: [
              {
                data: tagData
              }
            ]
          };
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
    });
    function fullStar(score2) {
      return Math.floor(score2);
    }
    function shouldShowHalfStar(score2) {
      return score2 % 1 === 0.5;
    }
    function emptyStar(score2) {
      return 5 - fullStar(score2) - (shouldShowHalfStar(score2) ? 1 : 0);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(base_url) + TestData.value.image_list[0],
        b: common_vendor.t(TestData.value.product_name),
        c: common_vendor.t(TestData.value.publish_by.username),
        d: common_vendor.t(TestData.value.start_time),
        e: common_vendor.t(TestData.value.end_time),
        f: common_vendor.f(fullStar(common_vendor.unref(score)), (starCount, k0, i0) => {
          return {};
        }),
        g: shouldShowHalfStar(common_vendor.unref(score))
      }, shouldShowHalfStar(common_vendor.unref(score)) ? {} : {}, {
        h: common_vendor.f(emptyStar(common_vendor.unref(score)), (emptyCount, k0, i0) => {
          return {};
        }),
        i: common_vendor.t(common_vendor.unref(score).toFixed(1)),
        j: common_vendor.t(TestData.value.product_introduce),
        k: TestData.value.status == 1
      }, TestData.value.status == 1 ? {} : {}, {
        l: TestData.value.status == 0
      }, TestData.value.status == 0 ? {} : {}, {
        m: common_vendor.p({
          type: "bar",
          opts: _ctx.opts,
          chartData: chartData.value
        }),
        n: common_vendor.p({
          type: "pie",
          opts: secondOpt.value,
          chartData: secondCharData.value
        }),
        o: !hide.value,
        p: common_vendor.o(($event) => hide.value = !hide.value),
        q: hide.value,
        r: common_vendor.o(($event) => hide.value = !hide.value),
        s: common_vendor.f(TestData.value.tests, (comment, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(base_url) + comment.user.avatar,
            b: common_vendor.t(comment.user.username),
            c: common_vendor.t(comment.publish_time),
            d: common_vendor.t(comment.feeling),
            e: comment.image_list.length != 0
          }, comment.image_list.length != 0 ? {
            f: common_vendor.f(comment.images, (image, k1, i1) => {
              return {
                a: common_vendor.unref(base_url) + image
              };
            })
          } : {}, {
            g: comment.id
          });
        }),
        t: !hide.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c4cee2a8"], ["__file", "D:/uniappProgramme/Beauty/pages/AduditResult/AduditResult.vue"]]);
wx.createPage(MiniProgramPage);
