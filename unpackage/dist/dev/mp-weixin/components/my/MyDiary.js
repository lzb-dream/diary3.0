"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "MyDiary",
  setup(__props) {
    const myStore = common_vendor.useStore();
    function styleVideoPhoto(i) {
      if (i.image.length > 0) {
        return `background-image:url(${i.image[0]})`;
      } else if (i.videoPhoto.length > 0) {
        return `background-image:url(${i.videoPhoto[0]})`;
      } else {
        return `background:	#e9ca9e`;
      }
    }
    function diaryAbstract(i) {
      let r = i.diary.substr(0, 50);
      if (i.diary.length > r.length) {
        return r + ". . .";
      } else {
        return r;
      }
    }
    function diaryJudeg(i) {
      if (i.image > 0) {
        return false;
      } else if (i.videoPhoto > 0) {
        return false;
      } else {
        return true;
      }
    }
    function checkDiary(i) {
      myStore.commit("readDiary/changeState", { name: "weather", value: i.weather });
      myStore.commit("readDiary/changeState", { name: "mood", value: i.mood });
      myStore.commit("readDiary/changeState", { name: "writeTime", value: i.writeTime });
      myStore.commit("readDiary/changeState", { name: "diary", value: i.diary });
      myStore.commit("readDiary/changeState", { name: "address", value: i.address });
      myStore.commit("readDiary/changeState", { name: "id", value: i.id });
      myStore.commit("readDiary/changeState", { name: "image", value: i.image });
      myStore.commit("readDiary/changeState", { name: "video", value: i.video });
      myStore.commit("readDiary/changeState", { name: "videoPhoto", value: i.videoPhoto });
      common_vendor.index.navigateTo({
        url: "/pages/readDiary/readDiary",
        success: () => {
          console.log(myStore.state.readDiary);
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.$store.state.my.diarys, (i, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(i.writeTime.split("T")[0]),
            b: diaryJudeg(i)
          }, diaryJudeg(i) ? {
            c: common_vendor.t(diaryAbstract(i))
          } : {}, {
            d: index,
            e: common_vendor.s(styleVideoPhoto(i)),
            f: common_vendor.o(($event) => checkDiary(i), index)
          });
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f9bef522"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/my/MyDiary.vue"]]);
wx.createComponent(Component);
