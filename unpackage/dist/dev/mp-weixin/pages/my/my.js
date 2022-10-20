"use strict";
var common_vendor = require("../../common/vendor.js");
var js_time = require("../../js/time.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  (_easycom_uni_popup2 + _easycom_uni_segmented_control2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_segmented_control + MyDiary + LoveDiary + ShareDiary)();
}
const MyDiary = () => "../../components/my/MyDiary.js";
const LoveDiary = () => "../../components/my/LoveDiary.js";
const ShareDiary = () => "../../components/my/ShareDiary.js";
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const url = common_vendor.inject("URL");
    const myStore = common_vendor.useStore();
    const items = ["\u6211\u5199\u7684\u65E5\u8BB0", "\u559C\u6B22\u7684\u65E5\u8BB0", "\u5206\u4EAB\u7684\u65E5\u8BB0"];
    let current = 0;
    const popup = common_vendor.ref(null);
    myStore.state.userInfo.nickName;
    async function changeHeadPortrait() {
      const res = await common_vendor.index.chooseImage();
      if (res.errMsg === "chooseImage:ok") {
        myStore.commit("changeUserInfo", { headPortrait: res.tempFilePaths[0] });
        console.log(res.tempFilePaths[0]);
      }
    }
    function popupOpen() {
      popup.value.open("bottom");
    }
    function popupClose() {
      popup.value.close();
    }
    common_vendor.onMounted(() => {
    });
    function login() {
      let headPortrait, nickname, addTime;
      common_vendor.index.getUserProfile({
        desc: "\u7528\u4E8E\u7528\u6237\u767B\u5F55",
        success: (res) => {
          headPortrait = res.userInfo.avatarUrl;
          nickname = res.userInfo.nickName;
          addTime = Date.now();
          console.log(addTime, js_time.time(addTime));
          common_vendor.index.login({
            success: (res2) => {
              let js_code = res2.code;
              common_vendor.index.request({
                url,
                data: {
                  js_code,
                  headPortrait,
                  nickName: nickname,
                  addTime
                },
                method: "GET",
                dataType: JSON,
                success: (res3) => {
                  if (res3.statusCode < 200 || res3.statusCode > 226) {
                    common_vendor.index.showModal({
                      title: "\u540E\u7AEF\u8BF7\u6C42\u5931\u8D25"
                    });
                    return false;
                  } else {
                    console.log(res3);
                    const userInfo = JSON.parse(res3.data);
                    console.log();
                    myStore.commit("login", userInfo);
                  }
                },
                fail: () => {
                  common_vendor.index.showModal({
                    title: "\u53D1\u9001\u8BF7\u6C42\u5931\u8D25"
                  });
                }
              });
            }
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_ctx.$store.state.hasLogin
      }, !_ctx.$store.state.hasLogin ? {
        b: common_vendor.o(login)
      } : {}, {
        c: common_vendor.s(`background-image:url(${common_vendor.unref(myStore).state.userInfo.headPortrait})`),
        d: common_vendor.t(_ctx.$store.state.userInfo.nickName),
        e: _ctx.$store.state.userInfo.headPortrait,
        f: common_vendor.t(_ctx.$store.state.userInfo.praise),
        g: common_vendor.t(_ctx.$store.state.userInfo.flowers),
        h: common_vendor.o(popupOpen),
        i: _ctx.$store.state.userInfo.nickName,
        j: common_vendor.o(($event) => _ctx.$store.state.userInfo.nickName = $event.detail.value),
        k: _ctx.$store.state.userInfo.headPortrait,
        l: common_vendor.o(changeHeadPortrait),
        m: common_vendor.o(popupClose),
        n: common_vendor.sr(popup, "0be17cc6-0", {
          "k": "popup"
        }),
        o: common_vendor.p({
          type: "bottom",
          ["is-mask-click"]: false
        }),
        p: common_vendor.o(_ctx.onClickItem),
        q: common_vendor.p({
          current: common_vendor.unref(current),
          values: items,
          ["active-color"]: "#6da6be"
        }),
        r: common_vendor.unref(current) === 0
      }, common_vendor.unref(current) === 0 ? {} : {}, {
        s: common_vendor.unref(current) === 1
      }, common_vendor.unref(current) === 1 ? {} : {}, {
        t: common_vendor.unref(current) === 2
      }, common_vendor.unref(current) === 2 ? {} : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0be17cc6"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
