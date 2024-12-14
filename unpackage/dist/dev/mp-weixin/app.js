"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/Login/Login.js";
  "./pages/index/index.js";
  "./pages/test/test.js";
  "./pages/me/me.js";
  "./pages/search/search.js";
  "./pages/ItemDetail/ItemDetail.js";
  "./pages/notCompleteItemDetail/notCompleteItemDetail.js";
  "./pages/share/share.js";
  "./pages/ScanResult/ScanResult.js";
  "./pages/inputTest/inputTest.js";
  "./pages/newTest/newTest.js";
  "./pages/AuditList/AuditList.js";
  "./pages/AuditDetail/AuditDetail.js";
  "./pages/AlreadyAdudit/AlreadyAdudit.js";
  "./pages/AduditResult/AduditResult.js";
  "./pages/MyAuditList/MyAuditList.js";
  "./pages/setting/setting.js";
  "./pages/ChangeUsername/ChangeUsername.js";
  "./pages/register/register.js";
  "./pages/forgetPassword/forgetPassword.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniappProgramme/Beauty/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
