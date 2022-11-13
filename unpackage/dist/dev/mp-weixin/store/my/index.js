"use strict";
var common_vendor = require("../../common/vendor.js");
var my = {
  namespaced: true,
  state: {
    diarys: []
  },
  getters: {},
  mutations: {
    changeState(state, obj) {
      state[obj.name] = obj.value;
    }
  },
  actions: {
    async getDiary(context) {
      let userId = common_vendor.index.getStorageSync("userInfo").id;
      const diaryRes = await common_vendor.index.request({
        url: "diary",
        data: { userId },
        method: "GET"
      });
      console.log(diaryRes);
      const diarys = diaryRes.data.diarys;
      console.log(typeof diarys);
      diarys.forEach((item) => {
        if (item.video) {
          item.video = JSON.parse(item.video);
          item.video.forEach((items, index) => {
            item.video[index] = "http://127.0.0.1:8000/" + items;
          });
          item.videoPhoto = JSON.parse(item.videoPhoto);
          item.videoPhoto.forEach((items, index) => {
            item.videoPhoto[index] = "http://127.0.0.1:8000/" + items;
          });
        }
        if (item.image) {
          item.image = JSON.parse(item.image);
          item.image.forEach((items, index) => {
            item.image[index] = "http://127.0.0.1:8000/" + items;
          });
        }
        item.image = item.image === "" ? [] : item.image;
        item.video = item.video === "" ? [] : item.video;
        item.videoPhoto = item.videoPhoto === "" ? [] : item.videoPhoto;
      });
      context.commit("changeState", { name: "diarys", value: diarys });
    }
  }
};
exports.my = my;
