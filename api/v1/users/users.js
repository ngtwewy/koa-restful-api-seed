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
  ctx.body = "show";
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
 * 
 */

exports.update = async (ctx) => {
  ctx.body = "update";
}