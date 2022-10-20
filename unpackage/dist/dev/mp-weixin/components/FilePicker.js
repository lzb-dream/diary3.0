"use strict";
var common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  (_easycom_uni_icons2 + _easycom_uni_collapse_item2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_collapse_item = () => "../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_collapse_item)();
}
const _sfc_main = {
  __name: "FilePicker",
  setup(__props) {
    const imageList = common_vendor.reactive([]);
    const videoList = common_vendor.reactive([]);
    async function choose() {
      let res = await common_vendor.index.chooseMedia();
      console.log(res);
      if (res.errMsg === "chooseMedia:ok") {
        for (var i = 0; i < res.tempFiles.length; i++) {
          if (res.type === "video") {
            videoList.push(res.tempFiles[i].tempFilePath);
          } else if (res.type === "image") {
            imageList.push(res.tempFiles[i].tempFilePath);
          }
          console.log(imageList, videoList);
        }
      }
    }
    function previewVideo() {
      console.log("\u7236\u89AA");
    }
    function close(index, type) {
      if (type === "image") {
        imageList.pop(index);
        console.log("\u7167\u7247");
      } else if (type === "video") {
        videoList.pop(index);
        console.log("\u89C6\u9891");
      }
      console.log(index);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(imageList, (i, index, i0) => {
          return {
            a: i,
            b: common_vendor.o(($event) => close(index, "image")),
            c: i
          };
        }),
        b: common_vendor.o(($event) => _ctx.previewImage()),
        c: common_vendor.f(videoList, (i, index, i0) => {
          return {
            a: i,
            b: common_vendor.o(($event) => close(index, "video")),
            c: i
          };
        }),
        d: common_vendor.o(($event) => previewVideo()),
        e: common_vendor.p({
          type: "plusempty",
          size: "65",
          color: "darkgray"
        }),
        f: common_vendor.o(choose),
        g: common_vendor.p({
          title: "\u5982\u4E0A\u4F20\u89C6\u9891\u4E0E\u7167\u7247\u8BF7\u70B9\u51FB\u8FD9\u91CC"
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-539bc876"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/FilePicker.vue"]]);
wx.createComponent(Component);
