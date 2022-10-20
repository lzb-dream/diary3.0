"use strict";
function time(timesplace) {
  var data = new Date(timesplace);
  var Y = data.getFullYear();
  var M = data.getMonth() < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
  var D = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
  var h = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  var m = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  var s = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
  var datatime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
  return datatime;
}
exports.time = time;
