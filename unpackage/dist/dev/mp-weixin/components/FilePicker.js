"use strict";
var common_vendor = require("../common/vendor.js");
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
const __default__ = {
  data() {
    return {
      videoplay: false,
      videoUrl: "",
      myStore: common_vendor.useStore()
    };
  },
  props: {
    title: String,
    deleteInco: Boolean,
    backgroundColor: String,
    operationType: String
  },
  onReady: function() {
    this.videoContext = common_vendor.index.createVideoContext("myvideo", this);
  },
  methods: {
    choose: async function() {
      if (this.myStore.state.record.videoList.length + this.myStore.state.record.imageList.length >= 6) {
        common_vendor.index.showModal({
          title: "\u89C6\u9891\u56FE\u7247\u6570\u91CF\u4E0D\u80FD\u5927\u4E8E6\u4E2A"
        });
        return false;
      }
      let res = await common_vendor.index.chooseMedia();
      console.log(res);
      console.log(this.$store.state.readDiary);
      if (res.errMsg === "chooseMedia:ok") {
        for (var i = 0; i < res.tempFiles.length; i++) {
          if (res.type === "video") {
            if (res.tempFiles[i].size / 1048576 >= 10) {
              common_vendor.index.showModal({
                title: "\u5355\u4E2A\u89C6\u9891\u4E0D\u80FD\u5927\u4E8E10mb"
              });
              return false;
            }
            if (this.operationType === "save") {
              this.myStore.commit("record/pushList", { name: "videoList", value: res.tempFiles[i].tempFilePath });
              this.myStore.commit("record/pushList", { name: "videoPhoto", value: res.tempFiles[i].thumbTempFilePath });
            } else if (this.operationType === "editor") {
              this.myStore.commit("readDiary/pushList", { name: "video", value: res.tempFiles[i].tempFilePath });
              this.myStore.commit("readDiary/pushList", { name: "videoPhoto", value: res.tempFiles[i].thumbTempFilePath });
              this.myStore.commit("readDiary/pushList", { name: "newVideo", value: res.tempFiles[i].tempFilePath });
              this.myStore.commit("readDiary/pushList", { name: "newVideoPhoto", value: res.tempFiles[i].thumbTempFilePath });
            }
          } else if (res.type === "image") {
            if (this.operationType === "save") {
              this.myStore.commit("record/pushList", { name: "imageList", value: res.tempFiles[i].tempFilePath });
            } else if (this.operationType === "editor") {
              this.myStore.commit("readDiary/pushList", { name: "image", value: res.tempFiles[i].tempFilePath });
              this.myStore.commit("readDiary/pushList", { name: "newImage", value: res.tempFiles[i].tempFilePath });
            }
          }
        }
      }
    },
    deleteVideo: function(index) {
      if (this.operationType === "save") {
        this.$store.commit("record/popList", { name: "videoList", index });
        this.$store.commit("record/popList", { name: "videoPhoto", index });
      } else if (this.operationType === "editor") {
        this.$store.commit("readDiary/popList", { name: "video", index });
        this.$store.commit("readDiary/popList", { name: "videoPhoto", index });
      }
    },
    deleteImage: function(index) {
      if (this.operationType === "save") {
        this.$store.commit("record/popList", { name: "imageList", index });
      } else if (this.operationType === "editor") {
        this.$store.commit("readDiary/popList", { name: "image", index });
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
    screenChange(e) {
      let fullScreen = e.detail.fullScreen;
      console.log(e, "qweeee========================================");
      if (!fullScreen) {
        this.videoplay = false;
      }
    }
  },
  options: {
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "FilePicker",
  props: ["backgroundColor", "operationType"],
  setup(__props) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "539bc876-backgroundColor": common_vendor.unref(backgroundColor)
    }));
    let backgroundColor = props.backgroundColor;
    let operationType = props.operationType;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(operationType) === "save" ? _ctx.$store.state.record.imageList : _ctx.$store.state.readDiary.image, (i, index, i0) => {
          return common_vendor.e({
            a: i,
            b: common_vendor.o(($event) => _ctx.previewImage(i))
          }, __props.deleteInco ? {
            c: common_vendor.o(($event) => _ctx.deleteImage(index))
          } : {}, {
            d: i
          });
        }),
        b: __props.deleteInco,
        c: common_vendor.f(common_vendor.unref(operationType) === "save" ? _ctx.$store.state.record.videoList : _ctx.$store.state.readDiary.video, (i, index, i0) => {
          return common_vendor.e({
            a: i
          }, __props.deleteInco ? {
            b: common_vendor.o(($event) => _ctx.deleteVideo(index))
          } : {}, {
            c: "539bc876-2-" + i0 + ",539bc876-1",
            d: i,
            e: common_vendor.o(($event) => _ctx.previewVideo(i), i)
          });
        }),
        d: __props.deleteInco,
        e: common_vendor.p({
          type: "videocam",
          size: "35",
          color: "#00F5FF"
        }),
        f: __props.deleteInco
      }, __props.deleteInco ? {
        g: common_vendor.p({
          type: "plusempty",
          size: "45",
          color: "darkgray"
        }),
        h: common_vendor.o((...args) => _ctx.choose && _ctx.choose(...args))
      } : {}, {
        i: common_vendor.p({
          title: __props.title,
          thumb: "http://127.0.0.1:8000/static/inco/picture.png",
          open: _ctx.$store.state.readDiary.editor
        }),
        j: common_vendor.s(_ctx.__cssVars()),
        k: _ctx.videoplay
      }, _ctx.videoplay ? {
        l: _ctx.videoUrl,
        m: common_vendor.o((...args) => _ctx.screenChange && _ctx.screenChange(...args)),
        n: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-539bc876"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/FilePicker.vue"]]);
wx.createComponent(Component);
