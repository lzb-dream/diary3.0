"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imageList: common_vendor.reactive([]),
      videoList: common_vendor.reactive([]),
      videoplay: false,
      videoUrl: "",
      myStore: common_vendor.useStore()
    };
  },
  onReady: function() {
    this.videoContext = common_vendor.index.createVideoContext("myvideo", this);
  },
  methods: {
    choose: async function() {
      let res = await common_vendor.index.chooseMedia();
      if (res.errMsg === "chooseMedia:ok") {
        for (var i = 0; i < res.tempFiles.length; i++) {
          if (res.type === "video") {
            this.videoList.push(res.tempFiles[i].tempFilePath);
            this.myStore.commit("record/changeState", { name: "videoList", value: this.videoList });
          } else if (res.type === "image") {
            this.imageList.push(res.tempFiles[i].tempFilePath);
            this.myStore.commit("record/changeState", { name: "imageList", value: this.imageList });
          }
        }
      }
    },
    previewVideo: function(videoUrl) {
      this.videoUrl = videoUrl;
      this.videoContext.requestFullScreen();
      this.videoContext.play();
      this.videoplay = true;
    },
    previewImage: function(imageUrl) {
      common_vendor.index.previewImage({
        urls: [imageUrl]
      });
    },
    close: function(index, type) {
      if (type === "image") {
        this.imageList.pop(index);
        console.log("\u7167\u7247");
      } else if (type === "video") {
        this.videoList.pop(index);
        console.log("\u89C6\u9891");
      }
      console.log(index);
    },
    screenChange(e) {
      let fullScreen = e.detail.fullScreen;
      console.log(e, "qweeee========================================");
      if (!fullScreen) {
        this.videoplay = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_icons2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_collapse_item = () => "../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.imageList, (i, index, i0) => {
      return {
        a: i,
        b: common_vendor.o(($event) => $options.previewImage(i)),
        c: common_vendor.o(($event) => $options.close(index, "image")),
        d: i
      };
    }),
    b: common_vendor.f($data.videoList, (i, index, i0) => {
      return {
        a: i,
        b: common_vendor.o(($event) => $options.close(index, "video")),
        c: "539bc876-2-" + i0 + ",539bc876-1",
        d: i,
        e: common_vendor.o(($event) => $options.previewVideo(i), i)
      };
    }),
    c: common_vendor.p({
      type: "videocam",
      size: "35",
      color: "#00F5FF"
    }),
    d: common_vendor.p({
      type: "plusempty",
      size: "45",
      color: "darkgray"
    }),
    e: common_vendor.o((...args) => $options.choose && $options.choose(...args)),
    f: common_vendor.p({
      title: "\u5982\u4E0A\u4F20\u89C6\u9891\u4E0E\u7167\u7247\u8BF7\u70B9\u51FB\u8FD9\u91CC"
    }),
    g: $data.videoplay
  }, $data.videoplay ? {
    h: $data.videoUrl,
    i: common_vendor.o((...args) => $options.screenChange && $options.screenChange(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-539bc876"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/FilePicker.vue"]]);
wx.createComponent(Component);
