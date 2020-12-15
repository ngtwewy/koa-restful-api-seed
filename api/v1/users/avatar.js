var path = require("path");
var fs = require('fs');

var i18n = require('i18n');
var Parameter = require('parameter');
var images = require("images");

var tools = require('../../../utils/tools');
var userModel = require('../../../models/user');
var assetModel = require('../../../models/asset');

var config = require("../../../config");

/**
 * 
 * @api {post} /users/avatar 用户上传头像
 * @apiName 用户上传头像
 * @apiGroup 用户接口
 * @apiVersion  1.0.0
 * 
 * @apiParam  {String} file 图片上传
 * 
 */
exports.store = async (ctx) => {
  // 1，检查文件上传信息，字段 file
  const file = ctx.request.files.file;

  // 2，检查文件类型，确认文件扩展名
  var allowImageType = ['image/png', 'image/jpeg', 'image/gif'];
  if (allowImageType.indexOf(file.type) == -1) {
    ctx.status = 422;
    ctx.body = { error: file.type + " " + i18n.__('422') };
    return;
  }

  // 3, 生成文件名
  var extName = "";
  if (file.type == "image/png") {
    extName = "png";
  } else if (file.type == "image/jpeg") {
    extName = "jpg";
  } else if (file.type == "image/gif") {
    extName = "gif";
  } else {
    extName = "png";
  }
  var filename = tools.uuid(15, 10);
  var destFilename = filename + "." + extName; // 目标文件

  try {
    // 4, 创建路径
    var destDir = tools.createYmd();
    var destPath = path.join(__dirname, '../../../static/uploads/images/') + destDir;
    tools.createFolder(destPath);

    // 5, 复制文件
    var buffer = await tools.pipe(file.path, destPath + '/' + destFilename);

    // 6, 修改文件尺寸
    var img = await images(destPath + '/' + destFilename);
    img = await img.size(300);
    await img.save(destPath + '/' + destFilename);

    // 7, 添加到数据库
    var data = {};
    data.file_name = destDir + "/" + destFilename;
    data.file_path = '/uploads/images/' + destDir + "/" + destFilename;
    data.created_at = Math.round(Date.now() / 1000);
    data.suffix = extName;
    var asset = await assetModel.create(data);
    if (!asset) {
      ctx.throw(500, "添加错误");
    }

    // 8, 返回信息
    var response = {};
    response.message = i18n.__("upload_success");
    response.data = data;
    ctx.status = 201;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
}

