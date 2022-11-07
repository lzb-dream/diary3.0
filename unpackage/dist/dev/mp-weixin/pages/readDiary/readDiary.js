"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  FilePicker();
}
const FilePicker = () => "../../components/FilePicker.js";
const _sfc_main = {
  __name: "readDiary",
  setup(__props) {
    const myStore = common_vendor.useStore();
    const readDiary = myStore.state.readDiary;
    console.log(readDiary);
    function mide() {
      if (readDiary.image || readDiary.video) {
        return true;
      } else {
        return false;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(readDiary).writeTime.replace("T", " ")),
        b: common_vendor.t(common_vendor.unref(readDiary).address),
        c: common_vendor.t(common_vendor.unref(readDiary).weather),
        d: common_vendor.t(common_vendor.unref(readDiary).mood),
        e: mide()
      }, mide() ? {
        f: common_vendor.p({
          title: "\u56FE\u7247\u6216\u89C6\u9891",
          imageList: _ctx.$store.state.readDiary.image,
          videoList: _ctx.$store.state.readDiary.video,
          deleteInco: false,
          backgroundColor: "#FFE4B5"
        })
      } : {}, {
        g: common_vendor.t(_ctx.$store.state.readDiary.diary)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13668ba2"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/pages/readDiary/readDiary.vue"]]);
wx.createPage(MiniProgramPage);
