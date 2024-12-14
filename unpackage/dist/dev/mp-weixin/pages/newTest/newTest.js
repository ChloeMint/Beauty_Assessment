"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  _easycom_uni_datetime_picker2();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  _easycom_uni_datetime_picker();
}
const _sfc_main = {
  __name: "newTest",
  setup(__props) {
    const productType = common_vendor.ref(["彩妆", "清洁", "护理"]);
    const selectProductType = common_vendor.ref("");
    const selectedImage = common_vendor.ref([]);
    const inputName = common_vendor.ref("");
    const feeling = common_vendor.ref("");
    const testGroup = common_vendor.ref(["所有肤质", "油性皮", "干性皮", "混合皮", "敏感皮", "中性皮", "其他"]);
    const selectedTestGroup = common_vendor.ref([]);
    const inputSkinType = common_vendor.ref("");
    const dateRange = common_vendor.ref([]);
    let base_url = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          base_url.value = res.data;
        }
      });
    });
    function isSelectedStyle(item) {
      return item == selectProductType.value;
    }
    function deleteImage(item) {
      let index = selectedImage.value.indexOf(item);
      selectedImage.value.splice(index, 1);
    }
    function selectImage() {
      common_vendor.index.chooseImage({
        count: 6,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"],
        //从相册选择
        success: function(res) {
          selectedImage.value = res.tempFilePaths;
        }
      });
    }
    function isVisitable() {
      return selectedImage.value.length == 0;
    }
    function getGroupList(e) {
      selectedTestGroup.value = e.detail.value;
      if (selectedTestGroup.value.indexOf("其他") !== -1) {
        let index = selectedTestGroup.value.indexOf("其他");
        selectedTestGroup.value[index] = inputSkinType.value;
      }
    }
    function maskClick(e) {
      dateRange.value = e;
    }
    function isPast(time) {
      let date = new Date();
      let nowYear = date.getFullYear();
      let nowMonth = date.getMonth();
      let nowDay = date.getDate();
      let parts = time.split("-");
      let year = parseInt(parts[0]);
      let month = parseInt(parts[1]) - 1;
      let day = parseInt(parts[2]);
      if (nowYear > year) {
        return true;
      }
      if (nowYear == year && nowMonth > month) {
        return true;
      }
      if (nowYear == year && nowMonth == month && nowDay > day) {
        return true;
      }
      return false;
    }
    function submit() {
      if (inputName.value == "") {
        common_vendor.index.showToast({ title: "您还没有输入测评产品名称", icon: "none" });
      } else if (selectProductType.value == "") {
        common_vendor.index.showToast({ title: "您还没有选择产品类型", icon: "none" });
      } else if (selectedImage.value.length == 0) {
        common_vendor.index.showToast({ title: "您还没有上传产品图", icon: "none" });
      } else if (feeling.value == "") {
        common_vendor.index.showToast({ title: "您还没有输入产品使用方式", icon: "none" });
      } else if (selectedTestGroup.value.length == 0) {
        common_vendor.index.showToast({ title: "您还没有选择测评分组", icon: "none" });
      } else if (dateRange.value.length == 0) {
        common_vendor.index.showToast({ title: "您没有选择起始时间", icon: "none" });
      } else if (isPast(dateRange.value[0])) {
        common_vendor.index.showToast({ title: "无法选择过去的日期作为起始时间", icon: "none" });
      } else {
        common_vendor.index.getStorage({
          key: "token",
          success: (res) => {
            let textData = {
              "type": selectProductType.value,
              "product_name": inputName.value,
              "start_time": dateRange.value[0].replace(/-/g, "."),
              "end_time": dateRange.value[1].replace(/-/g, "."),
              "product_introduce": feeling.value,
              "skin_type": JSON.stringify(selectedTestGroup.value.toString().split(","))
            };
            const formData = {};
            for (let key in textData) {
              if (textData.hasOwnProperty(key)) {
                formData[key] = textData[key];
              }
            }
            common_vendor.index.uploadFile({
              url: base_url.value + "/product/create",
              // 替换为实际的上传接口地址
              filePath: selectedImage.value[0],
              name: "files",
              // 后端接收文件时对应的字段名
              formData,
              // 额外的文本数据
              header: {
                "Authorization": res.data
              },
              success: (uploadFileRes) => {
                console.log("Upload success:", uploadFileRes.data);
                common_vendor.index.showToast({ title: "提交成功", icon: "none" });
                setTimeout(() => {
                  common_vendor.index.navigateBack({
                    delta: 1
                  });
                }, 500);
              },
              fail: (error) => {
                console.error("Upload failed:", error);
                common_vendor.index.showToast({ title: "提交失败", icon: "none" });
              }
            });
          }
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: inputName.value,
        b: common_vendor.o(($event) => inputName.value = $event.detail.value),
        c: common_vendor.f(productType.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => selectProductType.value = item),
            c: common_vendor.n(isSelectedStyle(item) ? "select-color" : "notSelect")
          };
        }),
        d: common_vendor.f(selectedImage.value, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => deleteImage(item))
          };
        }),
        e: common_vendor.o(selectImage),
        f: common_vendor.n(isVisitable() ? "addImageButtonVisible" : "addImageButtonInvisible"),
        g: feeling.value,
        h: common_vendor.o(($event) => feeling.value = $event.detail.value),
        i: common_vendor.f(testGroup.value, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.t(item)
          };
        }),
        j: inputSkinType.value,
        k: common_vendor.o(($event) => inputSkinType.value = $event.detail.value),
        l: common_vendor.o(getGroupList),
        m: common_vendor.o(maskClick),
        n: common_vendor.p({
          type: "daterange"
        }),
        o: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e6e050"], ["__file", "D:/uniappProgramme/Beauty/pages/newTest/newTest.vue"]]);
wx.createPage(MiniProgramPage);
