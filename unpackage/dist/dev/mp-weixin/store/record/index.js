"use strict";
var record = {
  namespaced: true,
  state: {
    weatherList: ["\u6674\u6717", "\u591A\u4E91", "\u96E8\u5929", "\u4E0B\u96EA"],
    moodList: ["\u5F00\u5FC3", "\u751F\u6C14", "\u59D4\u5C48"],
    imageList: [],
    videoList: [],
    videoPhoto: [],
    weather: "",
    mood: "",
    address: "",
    diary: "",
    addTime: ""
  },
  mutations: {
    changeState(state, obj) {
      state[obj.name] = obj.value;
    },
    pushList(state, obj) {
      state[obj.name].push(obj.value);
    },
    popList(state, obj) {
      state[obj.name].pop(obj.index);
    },
    emptyList(state, name) {
      state[name].length = 0;
    }
  },
  getters: {
    diaryDispose(state) {
      let test = state.diary.trim();
      return test;
    }
  },
  actions: {}
};
exports.record = record;
