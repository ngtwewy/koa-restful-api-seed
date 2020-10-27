/**
 * 短信 service
 *
 * @author ngtwewy <mail@restfulapi.cn>
 * @link https://restfulapi.cn
 */

const config = require("../../../config");

var https = require("https");
var qs = require("querystring");



var smsService = {
  send: function (mobile, code) {
    var apikey = config.sms.apikey;
    // 修改为您要发送的短信内容
    var text = config.sms.text;
    // 指定发送的模板编号
    var tpl_id = config.sms.tpl_id;
    // 指定发送模板的内容
    var tpl_value = { "#code#": code };
    // 查询账户信息https地址
    var get_user_info_uri = "/v2/user/get.json";
    // 智能匹配模板发送https地址
    var sms_host = "sms.yunpian.com";
    // 指定模板发送接口https地址
    var send_tpl_sms_uri = "/v2/sms/tpl_single_send.json";
    return new Promise((reslove, reject) => {
      var post_data = {
        apikey: apikey,
        mobile: mobile,
        tpl_id: tpl_id,
        tpl_value: qs.stringify(tpl_value)
      }; //这是需要提交的数据
      var content = qs.stringify(post_data);
      // post(uri, content, sms_host);
      var options = {
        hostname: sms_host,
        port: 443,
        path: send_tpl_sms_uri,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      };

      var req = https.request(options, function (res) {
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
          // console.log("BODY: " + chunk);
          reslove(chunk);
        });
      });
      req.write(content);
      req.end();
    });
  }

};


module.exports = smsService;
