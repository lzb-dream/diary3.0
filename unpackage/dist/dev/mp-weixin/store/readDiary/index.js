"use strict";
var readDiary = {
  namespaced: true,
  state: {
    weather: "",
    mood: "",
    address: "",
    writeTime: "",
    video: [],
    videoPhoto: [],
    image: [],
    diary: ""
  },
  getters: {},
  mutations: {
    changeState(state, obj) {
      state[obj.name] = obj.value;
    }
  },
  actions: {}
};
exports.readDiary = readDiary;
