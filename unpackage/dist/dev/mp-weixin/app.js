"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var js_interceptor = require("./js/interceptor.js");
var store_index = require("./store/index.js");
require("./store/record/index.js");
require("./store/my/index.js");
require("./store/readDiary/index.js");
if (!Math) {
  "./pages/record/record.js";
  "./pages/my/my.js";
  "./pages/readDiary/readDiary.js";
}
const _sfc_main = {
  onLaunch: function() {
    let URL = "http://127.0.0.1:8000/";
    js_interceptor.request(URL);
    common_vendor.index.setTabBarBadge({
      index: 1,
      text: "1"
    });
    this.$store.dispatch("readDiary/getUrl");
    this.$store.commit("getUserInfo");
    let statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    console.log(statusBarHeight);
    common_vendor.provide("statusBarHeight", statusBarHeight);
    let address = common_vendor.index.getStorageSync("address");
    if (address) {
      this.$store.commit("record/changeState", { name: "address", value: address });
    }
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
