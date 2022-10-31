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
    let statusBarHeight = common_vendor.inject("statusBarHeight") * 2 + "rpx", diary = common_vendor.ref(null), weather = common_vendor.ref(myStore.state.record.weatherList[0]), mood = common_vendor.ref(myStore.state.record.moodList[0]);
    common_vendor.ref(0);
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
    function diaryDispose(value) {
      let test = value.trim();
      return test;
    }
    common_vendor.onBeforeMount(() => {
      myStore.commit("record/changeState", { name: "weather", value: weather.value });
      myStore.commit("record/changeState", { name: "mood", value: mood.value });
    });
    common_vendor.onMounted(() => {
      myStore.commit("record/changeState", { name: "addTime", value: Date.now() });
      console.log(myStore.state.record);
    });
    common_vendor.watch(diary, (nv) => {
      let diary2 = diaryDispose(nv);
      myStore.commit("record/changeState", { name: "diary", value: diary2 });
      console.log(myStore.state.record.diary);
    });
    async function saveDiary(diaryData, writeTime) {
      const diaryRes = await common_vendor.index.request({
        url: "diary",
        data: {
          diary: diaryData.diary,
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
    async function saveImage(imageUrl, diaryId, writeTime, logo, i) {
      let name = i + myStore.state.userInfo.openId + "" + writeTime;
      const imageRes = await common_vendor.index.uploadFile({
        url: "imageManagement",
        filePath: imageUrl,
        fileType: "image",
        name,
        formData: { diaryId, name, openId: myStore.state.userInfo.openId, logo, writeTime }
      });
      return imageRes;
    }
    async function saveVideo(videoUrl, diaryId, writeTime, logo, i) {
      let name = i + myStore.state.userInfo.openId + "" + writeTime;
      const videoRes = await common_vendor.index.uploadFile({
        url: "videoManagement",
        filePath: videoUrl,
        fileType: "video",
        name,
        formData: { diaryId, name, openId: myStore.state.userInfo.openId, logo, writeTime }
      });
      return videoRes;
    }
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
      let writeTime = new Date(diaryData.addTime).getTime();
      {
        const diaryRes = await saveDiary(diaryData, writeTime);
        console.log(diaryRes);
        let diaryId = diaryRes.data.diaryId;
        console.log(diaryId);
        if (diaryData.imageList) {
          for (var i = 0; i < diaryData.imageList.length; i++) {
            const imageRes = await saveImage(diaryData.imageList[i], diaryId, writeTime, "create", i);
            console.log(imageRes);
          }
        }
        if (diaryData.videoList) {
          for (var i = 0; i < diaryData.videoList.length; i++) {
            const videoRes = await saveVideo(diaryData.videoList[i], diaryId, writeTime, "create", i);
            console.log(videoRes);
          }
        }
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
        o: common_vendor.o(_ctx.changeLog),
        p: common_vendor.o(($event) => _ctx.$store.state.record.addTime = $event),
        q: common_vendor.p({
          type: "datetime",
          modelValue: _ctx.$store.state.record.addTime
        }),
        r: _ctx.$store.state.record.diary
      }, _ctx.$store.state.record.diary ? {
        s: common_vendor.o(save)
      } : {}, {
        t: common_vendor.s(_ctx.__cssVars()),
        v: common_vendor.s(_ctx.__cssVars()),
        w: common_vendor.unref(diary),
        x: common_vendor.o(($event) => common_vendor.isRef(diary) ? diary.value = $event.detail.value : diary = $event.detail.value)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ec23634"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/WeatherAndAddress.vue"]]);
wx.createComponent(Component);
