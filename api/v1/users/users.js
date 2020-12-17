var i18n = require('i18n');
var Parameter = require('parameter');

var tools = require('../../../utils/tools');
var userModel = require('../../../models/user');

var config = require("../../../config");


/**
 * 
 * @api {get} /users/:uuid 获取用户信息
 * @apiName 获取用户信息
 * @apiGroup 用户接口
 * @apiVersion  1.0.0
 * @apiDescription 本接口获取用户详细信息
 * 
 * @apiParam  {String} uuid 用户的 uuid
 * 
 */
exports.show = async (ctx) => {
  // 验证参数
  var validator = new Parameter();
  var rule = { uuid: { type: 'string' } };
  var errors = validator.validate(rule, ctx.params);
  if (errors) {
    ctx.status = 400;
    ctx.body = { error: errors[0]['field'] + " " + errors[0]['message'] };
    return;
  }

  var user = await userModel.findOne({
    attributes: config.userFields,
    where: { uuid: ctx.params.uuid }
  });
  if (!user) {
    ctx.status = 404;
    return ctx.body = { error: { message: i18n.__('404') } };
  }
  ctx.body = { user };
}


/**
 * 
 * @api {put} /users/:uuid 更新用户信息
 * @apiName 更新用户信息
 * @apiGroup 用户接口
 * @apiVersion  1.0.0
 * @apiDescription 更新用户信息，所有字段均为选填
 * 
 * @apiParam  {String} nickname 选填，用户昵称
 * @apiParam  {String} signature 选填，用户签名
 * @apiParam  {String} birthday 选填，生日
 * @apiParam  {String} gender 选填，性别
 * @apiParam  {String} avatar 选填，头像
 * @apiParam  {String} address 选填，地址
 * 
 */
exports.update = async (ctx) => {
  // 验证权限，用户只可以修改自己的信息
  if (ctx.state.uuid != ctx.params.uuid) {
    ctx.status = 403;
    return ctx.body = { error: { message: i18n.__('403') } };
  }

  // 验证参数
  var validator = new Parameter();
  var rule = {
    nickname: { type: 'string', min: 1, max: 50, trim: true, required: false },
    signature: { type: 'string', min: 1, max: 200, required: false },
    birthday: { type: 'string', min: 1, max: 50, required: false },
    gender: { type: 'string', min: 1, max: 10, required: false },
    avatar: { type: 'string', min: 1, max: 250, required: false },
    address: { type: 'string', min: 1, max: 250, required: false }
  };
  var errors = validator.validate(rule, ctx.request.body);
  if (errors) {
    ctx.status = 400;
    return ctx.body = { error: errors[0]['field'] + " " + errors[0]['message'] };
  }

  ctx.request.body.updated_at = Math.floor(Date.now() / 1000);
  await userModel.update(ctx.request.body, { where: { uuid: ctx.params.uuid } });
  var user = await userModel.findOne({
    attributes: config.userFields,
    where: { uuid: ctx.state.uuid }
  });
  ctx.body = { user };
}