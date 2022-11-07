"use strict";
var common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_icons2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_datetime_picker = () => "../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_datetime_picker + FilePicker)();
}
const FilePicker = () => "./FilePicker.js";
const _sfc_main = {
  __name: "WeatherAndAddress",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "1ec23634-statusBarHeight": common_vendor.unref(statusBarHeight)
    }));
    const myStore = common_vendor.useStore();
    let statusBarHeight = common_vendor.inject("statusBarHeight") * 2 + "rpx", weather = common_vendor.ref(myStore.state.record.weatherList[0]), mood = common_vendor.ref(myStore.state.record.moodList[0]);
    common_vendor.ref(0);
    function focus() {
      if (!myStore.state.hasLogin) {
        common_vendor.index.showModal({
          title: "\u8BF7\u767B\u5F55\u540E\u4F7F\u7528",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.switchTab({
                url: "/pages/my/my"
              });
            }
          }
        });
      }
    }
    function getWeather_Mood(e, type) {
      if (type === "weather") {
        weather.value = myStore.state.record.weatherList[e.detail.value];
        myStore.commit("record/changeState", { name: "weather", value: weather.value });
      } else if (type === "mood") {
        mood.value = myStore.state.record.moodList[e.detail.value];
        myStore.commit("record/changeState", { name: "mood", value: mood.value });
      }
    }
    async function getAddress() {
      const ad = await common_vendor.index.chooseLocation();
      console.log(ad);
      myStore.commit("record/changeState", { name: "address", value: ad.name });
    }
    common_vendor.onBeforeMount(() => {
      myStore.commit("record/changeState", { name: "weather", value: weather.value });
      myStore.commit("record/changeState", { name: "mood", value: mood.value });
    });
    common_vendor.onMounted(() => {
      myStore.commit("record/changeState", { name: "addTime", value: Date.now() });
    });
    async function saveDiary(diaryData, writeTime) {
      const diaryRes = await common_vendor.index.request({
        url: "diary",
        data: {
          diary: myStore.getters["record/diaryDispose"],
          writeTime,
          mood: diaryData.mood,
          weather: diaryData.weather,
          address: diaryData.address,
          openId: myStore.state.userInfo.openId
        },
        method: "POST"
      });
      return diaryRes;
    }
    async function saveImage(imageUrl, diaryId, writeTime, i) {
      let name = i + myStore.state.userInfo.openId + "" + writeTime;
      const imageRes = await common_vendor.index.uploadFile({
        url: "imageManagement",
        filePath: imageUrl,
        fileType: "image",
        name,
        formData: { diaryId, name, openId: myStore.state.userInfo.openId, writeTime }
      });
      return imageRes;
    }
    async function saveVideo(videoUrl, diaryId, writeTime, i) {
      let name = i + myStore.state.userInfo.openId + "" + writeTime;
      const videoRes = await common_vendor.index.uploadFile({
        url: "videoManagement",
        filePath: videoUrl,
        fileType: "video",
        name,
        formData: { diaryId, name, openId: myStore.state.userInfo.openId, writeTime }
      });
      return videoRes;
    }
    async function saveVideoPhoto(videoPhotoUrl, diaryId, writeTime, i) {
      let name = i + myStore.state.userInfo.openId + "" + writeTime;
      const videoRes = await common_vendor.index.uploadFile({
        url: "videoPhotoManagement",
        filePath: videoPhotoUrl,
        fileType: "image",
        name,
        formData: { diaryId, name, openId: myStore.state.userInfo.openId, writeTime }
      });
      return videoRes;
    }
    let saveSwitch = true;
    async function save() {
      let ad = common_vendor.index.getStorageSync("address");
      if (ad !== myStore.state.record.address) {
        common_vendor.index.showModal({
          title: "\u662F\u5426\u5C06\u5730\u5740\u4FDD\u5B58\u4E3A\u9ED8\u8BA4\u5730\u5740",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.setStorageSync("address", myStore.state.record.address);
            }
          }
        });
      }
      const diaryData = myStore.state.record;
      if (!myStore.getters["record/diaryDispose"]) {
        common_vendor.index.showToast({
          title: "\u65E5\u8BB0\u4E3A\u7A7A",
          icon: "error"
        });
        return false;
      }
      let writeTime = new Date(diaryData.addTime).getTime();
      if (saveSwitch) {
        saveSwitch = false;
        setTimeout(() => {
          saveSwitch = true;
        }, 6e3);
        const diaryRes = await saveDiary(diaryData, writeTime);
        if (diaryRes.statusCode === 500) {
          common_vendor.index.showToast({
            title: "\u65E5\u8BB0\u4FDD\u5B58\u5931\u8D25",
            icon: "error"
          });
        }
        console.log(diaryRes);
        let diaryId = diaryRes.data.diaryId;
        console.log(diaryId);
        if (diaryData.imageList) {
          for (var i = 0; i < diaryData.imageList.length; i++) {
            const imageRes = await saveImage(diaryData.imageList[i], diaryId, writeTime, "create");
            if (imageRes.statusCode === 500) {
              common_vendor.index.showToast({
                title: "\u56FE\u7247\u4FDD\u5B58\u5931\u8D25",
                icon: "error"
              });
              return false;
            }
            console.log(imageRes);
          }
        }
        if (diaryData.videoList) {
          for (var i = 0; i < diaryData.videoList.length; i++) {
            const videoRes = await saveVideo(diaryData.videoList[i], diaryId, writeTime, i);
            if (videoRes.statusCode === 500) {
              common_vendor.index.showToast({
                title: "\u89C6\u9891\u4FDD\u5B58\u5931\u8D25",
                icon: "error"
              });
              return false;
            }
            console.log(videoRes);
          }
          for (var i = 0; i < diaryData.videoPhoto.length; i++) {
            const videoPhotoRes = await saveVideoPhoto(diaryData.videoPhoto[i], diaryId, writeTime, i);
            if (videoPhotoRes.statusCode === 500) {
              common_vendor.index.showToast({
                title: "\u89C6\u9891\u5C01\u9762\u4FDD\u5B58\u5931\u8D25",
                icon: "error"
              });
              return false;
            }
            console.log(videoPhotoRes);
          }
        }
        common_vendor.index.showToast({
          title: "\u65E5\u8BB0\u4FDD\u5B58\u6210\u529F",
          icon: "success"
        });
        let userId = myStore.state.userInfo.id;
        myStore.dispatch("my/getDiary", userId);
        myStore.commit("record/changeState", { name: "diary", value: "" });
        myStore.commit("record/emptyList", "imageList");
        myStore.commit("record/emptyList", "videoList");
      } else {
        console.log(saveSwitch);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(weather),
        b: common_vendor.o(($event) => common_vendor.isRef(weather) ? weather.value = $event.detail.value : weather = $event.detail.value),
        c: common_vendor.p({
          type: "bottom",
          size: "30",
          color: "gray"
        }),
        d: _ctx.$store.state.record.weatherList,
        e: common_vendor.o(($event) => getWeather_Mood($event, "weather")),
        f: common_vendor.unref(mood),
        g: common_vendor.o(($event) => common_vendor.isRef(mood) ? mood.value = $event.detail.value : mood = $event.detail.value),
        h: common_vendor.p({
          type: "bottom",
          size: "30",
          color: "gray"
        }),
        i: _ctx.$store.state.record.moodList,
        j: common_vendor.o(($event) => getWeather_Mood($event, "mood")),
        k: _ctx.$store.state.record.address,
        l: common_vendor.o(($event) => _ctx.$store.state.record.address = $event.detail.value),
        m: common_vendor.o(getAddress),
        n: common_vendor.p({
          type: "location-filled",
          size: "30",
          color: "#cc86d1"
        }),
        o: common_vendor.o(($event) => _ctx.$store.state.record.addTime = $event),
        p: common_vendor.p({
          type: "datetime",
          modelValue: _ctx.$store.state.record.addTime
        }),
        q: common_vendor.p({
          title: "\u5982\u9700\u4E0A\u4F20\u56FE\u7247\u89C6\u9891\u8BF7\u70B9\u51FB",
          imageList: _ctx.$store.state.record.imageList,
          videoList: _ctx.$store.state.record.videoList,
          deleteInco: true,
          backgroundColor: "#dcffbd"
        }),
        r: _ctx.$store.state.record.diary
      }, _ctx.$store.state.record.diary ? {
        s: common_vendor.o(save)
      } : {}, {
        t: common_vendor.s(_ctx.__cssVars()),
        v: common_vendor.o(focus),
        w: common_vendor.s(_ctx.__cssVars()),
        x: _ctx.$store.state.record.diary,
        y: common_vendor.o(($event) => _ctx.$store.state.record.diary = $event.detail.value)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ec23634"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/WeatherAndAddress.vue"]]);
wx.createComponent(Component);
