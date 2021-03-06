/**
 * @author ngtwewy <mail@restfulapi.cn>
 * @link https://restfulapi.cn
 */

var Sequelize = require('sequelize');
var Parameter = require('parameter');
var i18n = require('i18n');

var config = require("../../../config");
var codeModel = require("../../../models/code");
var smsService = require("./sms.service");
const { where } = require('sequelize');
const code = require('../../../models/code');


/**
 * 
 * @api {post} /send-code 验证码发送
 * @apiName 验证码发送
 * @apiGroup 权限相关
 * @apiVersion  3.1.1
 * 
 * @apiParam  {String} mobile 必填，手机号码
 * @apiParam  {String} length 选填，默认为验证码长度 
 * 
 */
exports.sendCode = async (ctx) => {
  // 验证参数
  var validator = new Parameter();
  var rule = {
    mobile: { type: 'string', min: 11, max: 11 },
    length: { type: 'int', required: false }
  };

  var errors = validator.validate(rule, ctx.request.body);
  if (errors && errors.length) {
    ctx.status = 400;
    ctx.body = { error: errors[0]['field'] + " " + errors[0]['message'] };
    return;
  }

  // 生成验证码
  var length = ctx.request.body.length
    ? ctx.request.body.length
    : config.code.length;
  var code = Math.random().toString();
  code = code.substr(2, length);

  // 除防轰炸外，还应该限制一个IP每天发送短信的总数
  const Op = Sequelize.Op;
  var counter = await codeModel.findAll({
    where: {
      [Op.and]: [
        { ip: ctx.ip },
        {
          created_at: {
            [Op.gt]: Math.floor(Date.now() / 1000) - 60 * 60 * 12
          }
        }
      ]
    }
  });
  if (counter.length >= config.code.rateLimit) {
    ctx.status = 429;
    ctx.body = { error: i18n.__('exceeding_the_speed_limit') }
    return;
  }

  // 发送验证码
  if (config.code.isTest != true) {
    var res = await smsService.send(ctx.request.body.mobile, code);
    res = JSON.parse(res);
    if (res.code != 0) {
      ctx.status = 500;
      ctx.body = { error: i18n.__('sms_sending_failed') + "，" + res.msg };
      return;
    }
  }

  // 保存验证码
  var time = Math.floor(Date.now() / 1000);
  var data = {
    code,
    account: ctx.request.body.mobile,
    is_used: 0,
    ip: ctx.ip,
    created_at: time,
    expired_at: time + 60 * 30
  };

  try {
    await codeModel.create(data);
    ctx.body = {
      message: i18n.__('sms_sending_success'),
      code: data
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: i18n.__('create_failed') };
  }
}



/**
 * 
 * @api {post} /check-code 验证码检查
 * @apiName 验证码检查
 * @apiGroup 权限相关
 * @apiVersion  3.0.0
 * @apiDescription 用于前端提前检查验证码是否正确
 * 
 * @apiParam  {String} mobile 接收验证码的手机号
 * @apiParam  {String} code 需要检查的验证码
 */
exports.checkCode = async (ctx) => {
  // 验证参数
  var validator = new Parameter();
  var rule = {
    mobile: { type: 'string', min: 11, max: 11 },
    code: { type: 'string', min: 6, max: 50 },
  };
  var errors = validator.validate(rule, ctx.request.body);
  if (errors && errors.length) {
    ctx.status = 400;
    ctx.body = { error: errors[0]['field'] + " " + errors[0]['message'] };
    return;
  }

  // 检查验证码是否存在
  var codeItem = await codeModel.findOne({
    where: {
      account: ctx.request.body.mobile,
      code: ctx.request.body.code
    }
  });
  var now = Math.round(Date.now());
  if (codeItem && codeItem.flag == null && now > codeItem.expired_at) {
    ctx.status = 200;
    ctx.body = { code: codeItem.code };
    return;
  }

  ctx.status = 404;
  ctx.body = { error: i18n.__('code_is_not_exist_or_expired') };
}
