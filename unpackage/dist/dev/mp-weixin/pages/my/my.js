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
    const myStore = common_vendor.useStore();
    const userInfo = myStore.state.userInfo;
    const items = ["\u6211\u5199\u7684\u65E5\u8BB0", "\u559C\u6B22\u7684\u65E5\u8BB0", "\u5206\u4EAB\u7684\u65E5\u8BB0"];
    let current = common_vendor.ref(0);
    let imageSave = false;
    let oldImage = myStore.state.userInfo.headPortrait;
    let nickNameSave = false;
    let oldNickName = myStore.state.userInfo.nickName;
    const popup = common_vendor.ref(null);
    let userId = myStore.state.userInfo.id;
    if (myStore.state.hasLogin) {
      myStore.dispatch("my/getDiary", userId);
    }
    common_vendor.watch(() => myStore.state.hasLogin, (nv) => {
      if (nv === true) {
        let userId2 = myStore.state.userInfo.id;
        myStore.dispatch("my/getDiary", userId2);
      }
    });
    function onClickItem(e) {
      if (current.value !== e.currentIndex) {
        current.value = e.currentIndex;
      }
    }
    common_vendor.watch(() => userInfo.nickName, (nv, ov) => {
      console.log(nv);
      nickNameSave = true;
    });
    async function changeHeadPortrait() {
      const res = await common_vendor.index.chooseImage();
      if (res.errMsg === "chooseImage:ok") {
        myStore.commit("changeUserInfo", { headPortrait: res.tempFilePaths[0] });
        imageSave = true;
        console.log(res.tempFilePaths[0]);
      }
    }
    function popupOpen() {
      popup.value.open("bottom");
    }
    function popupClose() {
      myStore.commit("changeUserInfo", { nickName: oldNickName, headPortrait: oldImage });
      popup.value.close();
    }
    function exit() {
      common_vendor.index.showModal({
        title: "\u4F60\u786E\u5B9A\u8981\u9000\u51FA\u767B\u5F55\u5417\uFF1F",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.removeStorageSync("address");
            myStore.commit("outLogin");
          }
        }
      });
    }
    function editorSave() {
      console.log(imageSave);
      let addTime = Date.now();
      let storage = null;
      if (imageSave) {
        common_vendor.index.uploadFile({
          url: "",
          filePath: userInfo.headPortrait,
          fileType: "image",
          name: userInfo.openId + String(addTime),
          formData: { openId: userInfo.openId, addTime, identify: "image" },
          success: (res) => {
            imageSave = false;
            if (res.statusCode === 200) {
              storage = common_vendor.index.getStorageSync("userInfo");
              storage.headPortrait = userInfo.headPortrait;
              common_vendor.index.setStorageSync("userInfo", storage);
            } else {
              common_vendor.index.showModal({
                title: "\u5934\u50CF\u4FDD\u5B58\u5931\u8D25"
              });
            }
            console.log(res);
          }
        });
      }
      if (nickNameSave) {
        common_vendor.index.request({
          url: "",
          method: "POST",
          data: { openId: userInfo.openId, addTime, nickName: userInfo.nickName, identify: "nickName" },
          success: (res) => {
            nickNameSave = false;
            if (res.statusCode === 200) {
              storage = common_vendor.index.getStorageSync("userInfo");
              storage.nickName = userInfo.nickName;
              common_vendor.index.setStorageSync("userInfo", storage);
            } else {
              common_vendor.index.showModal({
                title: "\u6635\u79F0\u4FDD\u5B58\u5931\u8D25"
              });
            }
          }
        });
      }
      popup.value.close();
    }
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
              common_vendor.index.request({
                url: "",
                data: {
                  js_code: res2.code,
                  headPortrait,
                  nickName: nickname,
                  addTime
                },
                method: "GET",
                dataType: JSON,
                timeout: 6e3,
                success: (res3) => {
                  if (res3.statusCode < 200 || res3.statusCode > 226) {
                    common_vendor.index.showModal({
                      title: "\u540E\u7AEF\u8BF7\u6C42\u5931\u8D25"
                    });
                    return false;
                  } else {
                    console.log(res3);
                    const userInfo2 = JSON.parse(res3.data);
                    console.log(userInfo2);
                    myStore.commit("login", userInfo2);
                  }
                },
                fail: (res3) => {
                  console.log(res3);
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
        h: common_vendor.o(exit),
        i: common_vendor.o(popupOpen),
        j: _ctx.$store.state.userInfo.nickName,
        k: common_vendor.o(($event) => _ctx.$store.state.userInfo.nickName = $event.detail.value),
        l: _ctx.$store.state.userInfo.headPortrait,
        m: common_vendor.o(changeHeadPortrait),
        n: _ctx.$store.state.record.address,
        o: common_vendor.o(($event) => _ctx.$store.state.record.address = $event.detail.value),
        p: common_vendor.o(popupClose),
        q: common_vendor.o(editorSave),
        r: common_vendor.sr(popup, "0be17cc6-0", {
          "k": "popup"
        }),
        s: common_vendor.p({
          type: "bottom",
          ["is-mask-click"]: false
        }),
        t: common_vendor.o(($event) => onClickItem($event)),
        v: common_vendor.p({
          current: common_vendor.unref(current),
          values: items,
          ["active-color"]: "#6da6be"
        }),
        w: common_vendor.unref(current) === 0
      }, common_vendor.unref(current) === 0 ? {} : {}, {
        x: common_vendor.unref(current) === 1
      }, common_vendor.unref(current) === 1 ? {} : {}, {
        y: common_vendor.unref(current) === 2
      }, common_vendor.unref(current) === 2 ? {} : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0be17cc6"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
