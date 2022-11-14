"use strict";
var common_vendor = require("../common/vendor.js");
function copy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }
  for (const key in obj) {
    result[key] = copy(obj[key]);
  }
  return result;
}
async function requests(obj) {
  const res = await common_vendor.index.request({
    url: obj.url,
    data: obj.data,
    method: obj.method
  });
  return res;
}
async function uploadfile(obj) {
  const res = await common_vendor.index.uploadFile({
    url: obj.url,
    filePath: obj.filePath,
    formData: obj.formData,
    name: obj.name
  });
  return res;
}
exports.copy = copy;
exports.requests = requests;
exports.uploadfile = uploadfile;
