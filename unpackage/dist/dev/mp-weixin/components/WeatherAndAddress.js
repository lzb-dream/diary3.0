"use strict";
var common_vendor = require("../common/vendor.js");
var js_way = require("../js/way.js");
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
  props: ["operationType"],
  setup(__props) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "1ec23634-statusBarHeight": common_vendor.unref(statusBarHeight)
    }));
    const myStore = common_vendor.useStore();
    let statusBarHeight = common_vendor.inject("statusBarHeight") * 2 + "rpx", weather = common_vendor.ref(myStore.state.record.weatherList[0]), mood = common_vendor.ref(myStore.state.record.moodList[0]), address = common_vendor.ref(myStore.state.record.address), diary = common_vendor.ref(myStore.state.record.diary);
    common_vendor.reactive(myStore.state.record.imageList);
    common_vendor.reactive(myStore.state.record.videoList);
    let operationType = props.operationType, oldImage = null, oldVideo = null, oldVideoPhoto = null, newImage = myStore.state.readDiary.newImage, newVideo = myStore.state.readDiary.newVideo, newVideoPhoto = myStore.state.readDiary.newVideoPhoto;
    common_vendor.ref(0);
    common_vendor.onBeforeMount(() => {
      if (operationType === "editor") {
        statusBarHeight = 0;
        weather.value = myStore.state.readDiary.weather;
        mood.value = myStore.state.readDiary.mood;
        address.value = myStore.state.readDiary.address;
        diary.value = myStore.state.readDiary.diary;
        common_vendor.reactive(myStore.state.readDiary.image);
        common_vendor.reactive(myStore.state.readDiary.video);
        oldImage = js_way.copy(myStore.state.readDiary.image);
        oldVideo = js_way.copy(myStore.state.readDiary.video);
        oldVideoPhoto = js_way.copy(myStore.state.readDiary.videoPhoto);
      } else if (operationType === "save") {
        myStore.commit("record/changeState", { name: "weather", value: weather.value });
        myStore.commit("record/changeState", { name: "mood", value: mood.value });
      }
    });
    common_vendor.onMounted(() => {
      myStore.commit("record/changeState", { name: "addTime", value: Date.now() });
    });
    common_vendor.watch(weather, (nv) => {
      if (operationType === "editor") {
        console.log(12345643213245464);
        myStore.commit("readDiary/changeState", { name: "weather", value: nv });
        myStore.commit("readDiary/updateData", { name: "weather", value: nv });
        console.log(123456789);
      } else if (operationType === "save") {
        myStore.commit("record/changeState", { name: "weather", value: nv });
      }
    });
    common_vendor.watch(mood, (nv) => {
      if (operationType === "editor") {
        myStore.commit("readDiary/changeState", { name: "mood", value: nv });
        myStore.commit("readDiary/changeState", { name: "mood", value: nv });
        myStore.commit("readDiary/updateData", { name: "mood", value: nv });
      } else if (operationType === "save") {
        myStore.commit("record/changeState", { name: "mood", value: nv });
      }
    });
    common_vendor.watch(address, (nv) => {
      if (operationType === "editor") {
        myStore.commit("readDiary/changeState", { name: "address", value: nv });
        myStore.commit("readDiary/updateData", { name: "address", value: nv });
      } else if (operationType === "save") {
        myStore.commit("record/changeState", { name: "address", value: nv });
      }
    });
    common_vendor.watch(diary, (nv) => {
      if (operationType === "editor") {
        myStore.commit("readDiary/changeState", { name: "diary", value: nv });
        myStore.commit("readDiary/updateData", { name: "diary", value: nv });
      } else if (operationType === "save") {
        myStore.commit("record/changeState", { name: "diary", value: nv });
      }
    });
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
    function update() {
      console.log(myStore.state.readDiary.updateData);
      console.log(newImage);
      console.log(newVideo);
      console.log(newVideoPhoto);
      console.log(oldImage);
      console.log(oldVideo);
      console.log(oldVideoPhoto);
      let updateTime = new Date().getTime();
      console.log(updateTime);
      if (myStore.state.readDiary.updateData !== {}) {
        common_vendor.index.request({
          url: "diary",
          method: "PUT",
          data: { id: myStore.state.readDiary.id, data: myStore.state.readDiary.updateData, updateTime },
          success: (res) => {
            console.log(res);
          }
        });
      }
      if (newImage.length > 0) {
        for (var i = 0; i < newImage.length; i++) {
          let name = i + myStore.state.userInfo.openId + "" + updateTime;
          let image = JSON.stringify(myStore.state.readDiary.image);
          common_vendor.index.uploadFile({
            url: "updateImage",
            fileType: "image",
            filePath: newImage[i],
            formData: { newImage: JSON.stringify(newImage), ImageList: image, updateTime, id: myStore.state.readDiary.id, name },
            name
          });
        }
      }
      if (newVideo.length > 0) {
        for (var i = 0; i < newVideo.length; i++) {
          let name = i + myStore.state.userInfo.openId + "" + updateTime;
          let videoList = JSON.stringify(myStore.state.readDiary.video);
          common_vendor.index.uploadFile({
            url: "updateVideo",
            fileType: "video",
            filePath: newVideo[i],
            formData: { newVideo: JSON.stringify(newVideo), videoList, updateTime, id: myStore.state.readDiary.id, name },
            name
          });
        }
        for (var i = 0; i < newVideoPhoto.length; i++) {
          let name = i + myStore.state.userInfo.openId + "" + updateTime;
          let videoPhotoList = JSON.stringify(myStore.state.readDiary.videoPhoto);
          common_vendor.index.uploadFile({
            url: "updateVideo",
            fileType: "image",
            filePath: newVideoPhoto[i],
            formData: { newVideoPhoto: JSON.stringify(newVideoPhoto), videoPhotoList, updateTime, id: myStore.state.readDiary.id, name },
            name
          });
        }
      }
    }
    function getWeather_Mood(e, type) {
      if (type === "weather") {
        weather.value = myStore.state.record.weatherList[e.detail.value];
      } else if (type === "mood") {
        mood.value = myStore.state.record.moodList[e.detail.value];
      }
    }
    async function getAddress() {
      const ad = await common_vendor.index.chooseLocation();
      address.value = ad.name;
    }
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
        diary.value = "";
      } else {
        console.log(saveSwitch);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(operationType) == "save"
      }, common_vendor.unref(operationType) == "save" ? {} : {}, {
        b: common_vendor.unref(weather),
        c: common_vendor.o(($event) => common_vendor.isRef(weather) ? weather.value = $event.detail.value : weather = $event.detail.value),
        d: common_vendor.p({
          type: "bottom",
          size: "30",
          color: "gray"
        }),
        e: _ctx.$store.state.record.weatherList,
        f: common_vendor.o(($event) => getWeather_Mood($event, "weather")),
        g: common_vendor.unref(mood),
        h: common_vendor.o(($event) => common_vendor.isRef(mood) ? mood.value = $event.detail.value : mood = $event.detail.value),
        i: common_vendor.p({
          type: "bottom",
          size: "30",
          color: "gray"
        }),
        j: _ctx.$store.state.record.moodList,
        k: common_vendor.o(($event) => getWeather_Mood($event, "mood")),
        l: common_vendor.unref(address),
        m: common_vendor.o(($event) => common_vendor.isRef(address) ? address.value = $event.detail.value : address = $event.detail.value),
        n: common_vendor.o(getAddress),
        o: common_vendor.p({
          type: "location-filled",
          size: "30",
          color: "#cc86d1"
        }),
        p: common_vendor.unref(operationType) !== "editor"
      }, common_vendor.unref(operationType) !== "editor" ? {
        q: common_vendor.o(($event) => _ctx.$store.state.record.addTime = $event),
        r: common_vendor.p({
          type: "datetime",
          modelValue: _ctx.$store.state.record.addTime
        })
      } : {}, {
        s: common_vendor.p({
          title: "\u5982\u9700\u4E0A\u4F20\u56FE\u7247\u89C6\u9891\u8BF7\u70B9\u51FB",
          deleteInco: true,
          operationType: common_vendor.unref(operationType),
          backgroundColor: "#dcffbd"
        }),
        t: _ctx.$store.state.record.diary && common_vendor.unref(operationType) === "save"
      }, _ctx.$store.state.record.diary && common_vendor.unref(operationType) === "save" ? {
        v: common_vendor.o(save)
      } : {}, {
        w: _ctx.$store.state.readDiary.diary && common_vendor.unref(operationType) === "editor"
      }, _ctx.$store.state.readDiary.diary && common_vendor.unref(operationType) === "editor" ? {
        x: common_vendor.o(update)
      } : {}, {
        y: common_vendor.s(_ctx.__cssVars()),
        z: common_vendor.o(focus),
        A: common_vendor.s(_ctx.__cssVars()),
        B: common_vendor.unref(diary),
        C: common_vendor.o(($event) => common_vendor.isRef(diary) ? diary.value = $event.detail.value : diary = $event.detail.value)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ec23634"], ["__file", "C:/Front_End/WX_PROGRAM/uniDiary/components/WeatherAndAddress.vue"]]);
wx.createComponent(Component);
