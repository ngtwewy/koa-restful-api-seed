const fs = require("fs");


exports.checkMobile = function (s) {
  var length = s.length;
  if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
    return true;
  } else {
    return false;
  }
};


exports.md5 = function (v) {
  var crypto = require('crypto');
  var md5 = crypto.createHash('md5');

  var str = md5.update(v).digest('hex');
  return str;

  // var crypto = require('crypto');
  //   var md5 = crypto.createHash('md5');

  //   var result = md5.update('a').digest('hex');

  //   // 输出：0cc175b9c0f1b6a831c399e269772661
  //   console.log(result);

}


exports.formatDateTime = function (inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}



exports.formatDate = function (inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;

  return y + '-' + m + '-' + d;
}


exports.delHtmlTag = function (str) {
  str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
  str = str.replace(/&nbsp;/ig, ' ');//去掉&nbsp;
  str = str.replace(/&gt;/ig, ' ');
  str = str.replace(/&lt;/ig, ' ');
  return str.replace(/<[^>]+>/g, "");
}


// 获取文章页中图片的 url 地址
exports.getContent = function (str) {
  var pattern = /(?:src=|data-original=)[\'\"]?([^\'\"]*)[\'\"]?/gi;
  while (img = pattern.exec(str)) {
    let url = "/uploads/images/" + img;
    str.replace(str, url);
  }
  return str;
}


exports.getImageUrl = function (url) {
  if (url) {
    return "/uploads/images/" + url;
  } else {
    return "/images/no-thumbnail.png";
  }
}


// exports.htmlDecode = function(str) {
//   var s = "";
//   if (str.length === 0) { return ""; }
//   s = str.replace(/&amp;/g, "&");
//   s = s.replace(/&lt;/g, "<");
//   s = s.replace(/&gt;/g, ">");
//   s = s.replace(/&nbsp;/g, " ");
//   s = s.replace(/&#39;/g, "\'");
//   s = s.replace(/&quot;/g, "\"");
//   return s;
// }



exports.htmlEncode = function (a) {
  a = "" + a;
  return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");;
}


exports.htmlDecode = function (a) {
  a = "" + a;
  return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}


// 生成月日年
exports.createYmd = function () {
  var year = new Date().getFullYear().toString();
  var month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString();
  var date = new Date().getDate() < 10 ? '0' + new Date().getDate().toString() : new Date().getDate().toString();
  return year + month + date;
}

// 创建文件夹
exports.createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};


/**
 * uuid 生成函数
 * 可指定长度和基数
 *
 * // 8 character ID (base=2)  uuid(8, 2)  //  "01001010"
 * // 8 character ID (base=10) uuid(8, 10) // "47473046"
 *
 */
exports.uuid = function (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}



