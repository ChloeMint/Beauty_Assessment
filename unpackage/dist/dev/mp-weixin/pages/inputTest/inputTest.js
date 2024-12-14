"use strict";
const common_vendor = require("../../common/vendor.js");
const network = require("../../network.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = {
  __name: "inputTest",
  setup(__props) {
    const itemId = common_vendor.ref();
    const selectType = common_vendor.ref("");
    const tagList = common_vendor.ref([]);
    const selectIndex = common_vendor.ref();
    const selectedImageList = common_vendor.ref([]);
    const inputTagValue = common_vendor.ref("");
    const feelings = common_vendor.ref("");
    let score = 0;
    let base_url = common_vendor.ref("");
    const dataList = common_vendor.ref(
      {
        image_list: [""],
        skinTypes: [],
        tagList: []
      }
    );
    common_vendor.onLoad((options) => {
      itemId.value = options.itemId;
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          base_url.value = res.data;
        }
      });
      network.createRequest("/product/productDetail/" + itemId.value, "GET", {
        "Content-Type": "application/json"
      }, {}).then((data) => {
        if (data.code == 200) {
          dataList.value = data.data;
        } else {
          common_vendor.index.showToast({ title: data.msg, icon: "none" });
        }
      }).catch((error) => {
        console.error("请求失败:", error);
        common_vendor.index.showToast({ title: error.errMsg, icon: "error" });
      });
      tagList.value = ["拔干", "滋润", "卡粉"];
    });
    function changeRadio(e) {
      selectType.value = e.detail.value;
    }
    function changeScore(e) {
      score = e.value;
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
          selectedImageList.value = res.tempFilePaths;
        }
      });
    }
    function isVisitable() {
      return selectedImageList.value.length == 0;
    }
    function deleteImage(item) {
      let index = selectedImageList.value.indexOf(item);
      selectedImageList.value.splice(index, 1);
    }
    function addTag() {
      if (inputTagValue.value == "")
        ;
      else if (tagList.value.indexOf(inputTagValue.value) == -1) {
        tagList.value.push(inputTagValue.value);
        inputTagValue.value = "";
      } else {
        common_vendor.index.showToast({ title: "已添加过该标签", icon: "none" });
      }
    }
    function setSelectStyle(item) {
      selectIndex.value = tagList.value.indexOf(item);
    }
    function submitInfo() {
      if (selectType.value == "") {
        common_vendor.index.showToast({ title: "您还没选择肤质", icon: "none" });
      } else if (selectIndex.value == null) {
        common_vendor.index.showToast({ title: "您还没选择标签", icon: "none" });
      } else if (feelings.value == "") {
        common_vendor.index.showToast({ title: "您还没输入感受", icon: "none" });
      } else {
        common_vendor.index.getStorage({
          key: "token",
          success: (res) => {
            let textData = {
              "product_id": dataList.value.id,
              "skin_type": selectType.value,
              "tag": tagList.value[selectIndex.value],
              "score": score,
              "feeling": feelings.value
            };
            const formData = {};
            for (let key in textData) {
              if (textData.hasOwnProperty(key)) {
                formData[key] = textData[key];
              }
            }
            common_vendor.index.uploadFile({
              url: base_url.value + "/test/addTest",
              // 替换为实际的上传接口地址
              filePath: selectedImageList.value[0],
              name: "files",
              // 后端接收文件时对应的字段名
              formData,
              // 额外的文本数据
              header: {
                "Authorization": res.data
              },
              success: (uploadFileRes) => {
                let result = JSON.parse(uploadFileRes.data);
                console.log(result.code);
                if (result.code == 200) {
                  common_vendor.index.showToast({ title: "提交成功", icon: "none" });
                  setTimeout(() => {
                    common_vendor.index.navigateBack(
                      { delta: 1 }
                    );
                  }, 500);
                } else {
                  common_vendor.index.showToast({ title: "提交失败," + result.msg, icon: "none" });
                }
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
        a: common_vendor.t(dataList.value.product_name),
        b: common_vendor.unref(base_url) + dataList.value.image_list[0],
        c: common_vendor.f(dataList.value.skin_list, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.t(item)
          };
        }),
        d: common_vendor.o(changeRadio),
        e: common_vendor.f(tagList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => setSelectStyle(item)),
            c: common_vendor.n(tagList.value[selectIndex.value] == item ? "selectTag" : "")
          };
        }),
        f: common_vendor.o(addTag),
        g: inputTagValue.value,
        h: common_vendor.o(($event) => inputTagValue.value = $event.detail.value),
        i: common_vendor.f(selectedImageList.value, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => deleteImage(item))
          };
        }),
        j: common_vendor.o(selectImage),
        k: common_vendor.n(isVisitable() ? "addImageButtonVisible" : "addImageButtonInvisible"),
        l: common_vendor.o(changeScore),
        m: common_vendor.p({
          ["allow-half"]: true,
          value: common_vendor.unref(score)
        }),
        n: feelings.value,
        o: common_vendor.o(($event) => feelings.value = $event.detail.value),
        p: common_vendor.o(submitInfo)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9f30ca1b"], ["__file", "D:/uniappProgramme/Beauty/pages/inputTest/inputTest.vue"]]);
wx.createPage(MiniProgramPage);
