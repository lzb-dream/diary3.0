"use strict";
var common_vendor = require("../common/vendor.js");
function request(URL) {
  common_vendor.index.addInterceptor("request", {
    invoke(args) {
      args.url = URL + args.url;
    }
  });
  common_vendor.index.addInterceptor("uploadFile", {
    invoke(args) {
      args.url = URL + args.url;
    }
  });
}
exports.request = request;
