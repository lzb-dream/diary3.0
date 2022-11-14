"use strict";
var common_vendor = require("../../common/vendor.js");
var js_way = require("../../js/way.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + FilePicker + WeatherAndAddress)();
}
const WeatherAndAddress = () => "../../components/WeatherAndAddress.js";
const FilePicker = () => "../../components/FilePicker.js";
const _sfc_main = {
  __name: "readDiary",
  setup(__props) {
    const myStore = common_vendor.useStore();
    const readDiary = myStore.state.readDiary;
    myStore.commit("readDiary/changeState", { name: "oldWeather", value: readDiary.weather });
    myStore.commit("readDiary/changeState", { name: "oldMood", value: readDiary.mood });
    myStore.commit("readDiary/changeState", { name: "oldAddress", value: readDiary.address });
    myStore.commit("readDiary/changeState", { name: "oldVideo", value: js_way.copy(readDiary.video) });
    myStore.commit("readDiary/changeState", { name: "oldVideoPhoto", value: js_way.copy(readDiary.videoPhoto) });
    myStore.commit("readDiary/changeState", { name: "oldImage", value: js_way.copy(readDiary.image) });
    myStore.commit("readDiary/changeState", { name: "oldDiary", value: readDiary.diary });
    function mide() {
      if (readDiary.image || readDiary.video) {
        return true;
      } else {
        return false;
      }
    }
    async function editor() {
      const res = await common_vendor.index.showModal({
        title: "\u786E\u5B9A\u8981\u7F16\u8F91\u5F53\u524D\u65E5\u8BB0\u5417\uFF1F"
      });
      if (res.confirm) {
        myStore.commit("readDiary/changeState", { name: "editor", value: true });
      }
    }
    function back() {
      if (!readDiary.getUserInfo) {
        myStore.commit("readDiary/changeState", { name: "weather", value: readDiary.oldWeather });
        myStore.commit("readDiary/changeState", { name: "mood", value: readDiary.oldMood });
        myStore.commit("readDiary/changeState", { name: "address", value: readDiary.oldAddress });
        myStore.commit("readDiary/changeState", { name: "diary", value: readDiary.oldDiary });
        myStore.commit("readDiary/putList", { name: "video", value: readDiary.oldVideo });
        myStore.commit("readDiary/putList", { name: "videoPhoto", value: readDiary.oldVideoPhoto });
        myStore.commit("readDiary/putList", { name: "image", value: readDiary.oldImage });
      }
      common_vendor.index.switchTab({
        url: "/pages/my/my",
        success: () => {
          myStore.commit("readDiary/changeState", { name: "editor", value: false });
        }
      });
      myStore.commit("readDiary/empty", "deleteVideo");
      myStore.commit("readDiary/empty", "deleteVideoPhoto");
      myStore.commit("readDiary/empty", "deleteImage");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(back),
        b: common_vendor.p({
          dark: true,
          fixed: true,
          shadow: true,
          ["background-color"]: "#fae0b2",
          color: "black",
          ["status-bar"]: true,
          ["left-icon"]: "left",
          ["left-text"]: "\u8FD4\u56DE",
          title: "\u8FD9\u91CC\u662F\u6211\u7684\u56DE\u5FC6"
        }),
        c: !common_vendor.unref(readDiary).editor
      }, !common_vendor.unref(readDiary).editor ? common_vendor.e({
        d: common_vendor.t(common_vendor.unref(readDiary).writeTime.replace("T", " ")),
        e: common_vendor.t(common_vendor.unref(readDiary).address),
        f: common_vendor.t(common_vendor.unref(readDiary).weather),
        g: common_vendor.t(common_vendor.unref(readDiary).mood),
        h: mide()
      }, mide() ? {
        i: common_vendor.p({
          title: "\u56FE\u7247\u6216\u89C6\u9891",
          backgroundColor: "#fae0b2",
          deleteInco: false
        })
      } : {}, {
        j: common_vendor.t(common_vendor.unref(readDiary).diary),
        k: !common_vendor.unref(readDiary).editor
      }, !common_vendor.unref(readDiary).editor ? {
        l: common_vendor.o(editor)
      } : {}) : {}, {
        m: common_vendor.unref(readDiary).editor
      }, common_vendor.unref(readDiary).editor ? {
        n: common_vendor.p({
          operationType: "editor"
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13668ba2"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/pages/readDiary/readDiary.vue"]]);
wx.createPage(MiniProgramPage);
