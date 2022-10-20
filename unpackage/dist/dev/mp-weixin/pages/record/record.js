"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  WeatherAndAddress();
}
const WeatherAndAddress = () => "../../components/WeatherAndAddress.js";
const _sfc_main = {
  __name: "record",
  setup(__props) {
    let diary = common_vendor.ref("");
    const a = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      console.log(a.value);
    });
    function diaryFocus(value) {
      let test = value.value.trim();
      if (test == null || test == "" || test == void 0)
        return false;
      diary.value = value.value;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(diaryFocus),
        b: common_vendor.unref(diary)
      }, common_vendor.unref(diary) ? {} : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3b6eb0a6"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/pages/record/record.vue"]]);
wx.createPage(MiniProgramPage);
