"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const selectedImage = common_vendor.ref("");
    let base_url = common_vendor.ref("");
    let token = common_vendor.ref("");
    common_vendor.onLoad(() => {
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          base_url.value = res.data;
        }
      });
    });
    function changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"],
        //从相册选择
        success: function(res) {
          common_vendor.index.getStorage({
            key: "token",
            success: (tokenRes) => {
              token.value = tokenRes.data;
              selectedImage.value = res.tempFilePaths[0];
              common_vendor.index.uploadFile({
                url: base_url.value + "/user/changeUserAvatar",
                // 替换为实际的上传接口地址
                filePath: selectedImage.value,
                name: "files",
                // 后端接收文件时对应的字段名
                header: {
                  "Authorization": token.value
                },
                success: (uploadFileRes) => {
                  let result = JSON.parse(uploadFileRes.data);
                  console.log(result);
                  if (result.code == 200) {
                    common_vendor.index.setStorage({
                      key: "avatar",
                      data: result.data
                    });
                    common_vendor.index.showToast({
                      title: "修改成功"
                    });
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
      });
    }
    function changeUsername() {
      common_vendor.index.navigateTo({
        url: "/pages/ChangeUsername/ChangeUsername"
      });
    }
    function logout() {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "请问您确定要退出登陆吗?",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/Login/Login"
            });
            common_vendor.index.removeStorage({
              key: "permissions"
            });
            common_vendor.index.removeStorage({
              key: "token"
            });
            common_vendor.index.removeStorage({
              key: "username"
            });
            common_vendor.index.removeStorage({
              key: "avatar"
            });
            common_vendor.index.removeStorage({
              key: "userId"
            });
          } else if (res.cancel)
            ;
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => changeAvatar()),
        b: common_vendor.o(($event) => changeUsername()),
        c: common_vendor.o(logout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniappProgramme/Beauty/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
