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
  emits: ["diaryFocus"],
  setup(__props, { emit: emits }) {
    common_vendor.useCssVars((_ctx) => ({
      "1ec23634-statusBarHeight": common_vendor.unref(statusBarHeight)
    }));
    let statusBarHeight = common_vendor.inject("statusBarHeight") * 2 + "rpx", datetimesingle = common_vendor.ref(null), diary = common_vendor.ref(null), weather = common_vendor.ref(null), mood = common_vendor.ref(null);
    common_vendor.ref(0);
    let address = common_vendor.ref(null);
    const myStore = common_vendor.useStore(), weatherList = myStore.state.record.weatherList, moodList = myStore.state.record.moodList;
    function getWeather_Mood(e, type) {
      if (type === "weather") {
        weather.value = weatherList[e.detail.value];
      } else if (type === "mood") {
        mood.value = moodList[e.detail.value];
      }
    }
    async function getAddress() {
      const ad = await common_vendor.index.chooseLocation();
      try {
        address.value = ad.address.split("\u5E02")[1] + ad.name;
      } catch {
        address.value = ad.name;
      }
    }
    common_vendor.onMounted(() => {
      datetimesingle.value = Date.now() - 2 * 24 * 3600 * 1e3;
      console.log(datetimesingle.value);
    });
    common_vendor.watch(diary, () => {
      emits("diaryFocus", diary);
    });
    common_vendor.watch(mood, (nv) => {
      console.log(nv);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(weather),
        b: common_vendor.o(($event) => common_vendor.isRef(weather) ? weather.value = $event.detail.value : weather = $event.detail.value),
        c: common_vendor.unref(weatherList),
        d: common_vendor.o(($event) => getWeather_Mood($event, "weather")),
        e: common_vendor.unref(mood),
        f: common_vendor.o(($event) => common_vendor.isRef(mood) ? mood.value = $event.detail.value : mood = $event.detail.value),
        g: common_vendor.unref(moodList),
        h: common_vendor.o(($event) => getWeather_Mood($event, "mood")),
        i: common_vendor.unref(address),
        j: common_vendor.o(($event) => common_vendor.isRef(address) ? address.value = $event.detail.value : address = $event.detail.value),
        k: common_vendor.o(getAddress),
        l: common_vendor.p({
          type: "location-filled",
          size: "30"
        }),
        m: common_vendor.o(_ctx.changeLog),
        n: common_vendor.o(($event) => common_vendor.isRef(datetimesingle) ? datetimesingle.value = $event : datetimesingle = $event),
        o: common_vendor.p({
          type: "datetime",
          modelValue: common_vendor.unref(datetimesingle)
        }),
        p: common_vendor.s(_ctx.__cssVars()),
        q: common_vendor.s(_ctx.__cssVars()),
        r: common_vendor.unref(diary),
        s: common_vendor.o(($event) => common_vendor.isRef(diary) ? diary.value = $event.detail.value : diary = $event.detail.value)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ec23634"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/WeatherAndAddress.vue"]]);
wx.createComponent(Component);
