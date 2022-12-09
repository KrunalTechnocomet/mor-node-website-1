"use strict";

exports.defaultTransactionId = () => {
  var dt = new Date();

  var year = dt.getFullYear().toString().slice(-2);
  var month = (dt.getMonth() + 1).toString().padStart(2, "0");
  var day = dt.getDate().toString().padStart(2, "0");
  var hour = dt.getHours().toString().padStart(2, "0");
  var Minute = dt.getMinutes().toString().padStart(2, "0");
  var char = Math.random().toString(36).slice(-1);
  var val = Math.floor(1000 + Math.random() * 9000);

  const joined = [day+month+year+hour+Minute+char+val].join();
  return joined
};
