"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "me",
  setup(__props) {
    const permission = common_vendor.ref();
    const avatar = common_vendor.ref("");
    const username = common_vendor.ref("");
    const baseUrl = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      common_vendor.index.getStorage({
        key: "baseUrl",
        success: (res) => {
          baseUrl.value = res.data;
        }
      });
    });
    function initUserInfo() {
      common_vendor.index.getStorage({
        key: "permissions",
        success: (res) => {
          permission.value = res.data;
        }
      });
      common_vendor.index.getStorage({
        key: "username",
        success: (res) => {
          username.value = res.data;
        }
      });
      common_vendor.index.getStorage({
        key: "avatar",
        success: (res) => {
          avatar.value = res.data;
        }
      });
    }
    function turnToAuditListPage() {
      common_vendor.index.navigateTo({
        url: "/pages/AuditList/AuditList"
      });
    }
    function turnToAlreadyAuditPage() {
      common_vendor.index.navigateTo({
        url: "/pages/AlreadyAdudit/AlreadyAdudit"
      });
    }
    function turnToMyAuditPage() {
      common_vendor.index.navigateTo({
        url: "/pages/MyAuditList/MyAuditList"
      });
    }
    function turnToSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    }
    common_vendor.onShow(() => {
      initUserInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: baseUrl.value + avatar.value,
        b: common_vendor.t(username.value),
        c: permission.value == 0
      }, permission.value == 0 ? {} : {}, {
        d: permission.value == 1
      }, permission.value == 1 ? {} : {}, {
        e: permission.value == 0
      }, permission.value == 0 ? {
        f: common_vendor.o(($event) => turnToAuditListPage())
      } : {}, {
        g: permission.value == 0
      }, permission.value == 0 ? {} : {}, {
        h: permission.value == 0
      }, permission.value == 0 ? {
        i: common_vendor.o(($event) => turnToAlreadyAuditPage())
      } : {}, {
        j: permission.value == 0
      }, permission.value == 0 ? {} : {}, {
        k: common_vendor.o(($event) => turnToMyAuditPage()),
        l: common_vendor.o(($event) => turnToSetting())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19c123a7"], ["__file", "D:/uniappProgramme/Beauty/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
