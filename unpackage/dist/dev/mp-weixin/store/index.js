"use strict";
var common_vendor = require("../common/vendor.js");
var store_record_index = require("./record/index.js");
const store = common_vendor.createStore({
  state: {
    hasLogin: false,
    userInfo: {}
  },
  mutations: {
    changeUserInfo(state, object) {
      for (let key in object) {
        state.userInfo[key] = object[key];
      }
      console.log(state.userInfo);
    },
    login(state, info) {
      state.userInfo = info;
      state.hasLogin = true;
      common_vendor.index.setStorageSync("userInfo", info);
    },
    getUserInfo(state) {
      let userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo) {
        state.userInfo = userInfo;
        state.hasLogin = true;
      } else {
        state.hasLogin = false;
      }
    },
    outLogin(state) {
    }
  },
  getters: {},
  actions: {},
  modules: {
    record: store_record_index.record
  }
});
exports.store = store;
