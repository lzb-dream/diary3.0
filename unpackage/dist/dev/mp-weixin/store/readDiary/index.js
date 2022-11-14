"use strict";
var readDiary = {
  namespaced: true,
  state: {
    id: "",
    writeTime: "",
    weather: "",
    mood: "",
    address: "",
    video: [],
    videoPhoto: [],
    image: [],
    diary: "",
    editor: false,
    getUserInfo: false,
    oldWeather: "",
    oldMood: "",
    oldAddress: "",
    oldVideo: [],
    oldVideoPhoto: [],
    oldImage: [],
    oldDiary: "",
    updateData: {},
    newVideo: [],
    newImage: [],
    newVideoPhoto: [],
    deleteImage: [],
    deleteVideo: [],
    deleteVideoPhoto: [],
    URl: ""
  },
  getters: {
    getUrl(state, getters, rootState, rootGetters) {
      console.log(rootState);
    }
  },
  mutations: {
    changeState(state, obj) {
      state[obj.name] = obj.value;
    },
    pushList(state, obj) {
      state[obj.name].push(obj.value);
    },
    popList(state, obj) {
      if (obj.name === "image" || obj.name === "video" || obj.name === "videoPhoto") {
        let num = state[obj.name][obj.index].indexOf("http://127.0.0.1:8000/");
        if (num > -1) {
          switch (obj.name) {
            case "image":
              state.deleteImage.push(obj.value);
              break;
            case "video":
              state.deleteVideo.push(obj.value);
              break;
            case "VideoPhoto":
              state.deleteVideoPhoto.push(obj.value);
          }
        }
      }
      state[obj.name].splice(obj.index, 1);
    },
    updateData(state, obj) {
      state["updateData"][obj.name] = obj.value;
    },
    putList(state, obj) {
      console.log("\u6211\u662FputList");
      state[obj.name].length = 0;
      for (let key in obj.value) {
        state[obj.name][key] = obj.value[key];
      }
      console.log(obj.name, state[obj.name]);
    },
    empty(state, listName) {
      state[listName].length = 0;
    }
  },
  actions: {
    getUrl(context) {
      context.commit("changeState", { name: "URL", value: context.rootState.URL });
    }
  }
};
exports.readDiary = readDiary;
