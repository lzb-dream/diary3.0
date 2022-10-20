"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
require("./store/record/index.js");
if (!Math) {
  "./pages/record/record.js";
  "./pages/square/square.js";
  "./pages/my/my.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.setTabBarBadge({
      index: 1,
      text: "1"
    });
    this.$store.commit("getUserInfo");
    let statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    console.log(statusBarHeight);
    common_vendor.provide("statusBarHeight", statusBarHeight);
    common_vendor.provide("URL", "http://127.0.0.1:8000/");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Front_End/WX_PROGRAM/uniDiary/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App).use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
