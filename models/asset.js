var Sequelize = require("sequelize");
var db = require('./db');

var code = db.define('tb_asset',
  {
    id: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: { type: Sequelize.STRING(150), comment: "用户uuid" },
    parent_id: { type: Sequelize.BIGINT(20), comment: "父id，比如相关文章的图片，非必填" },
    file_size: { type: Sequelize.BIGINT(20), comment: "文件大小,单位B" },
    status: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      defaultValue: 1,
      comment: "状态;1:可用,0:不可用"
    },
    download_counter: { type: Sequelize.BIGINT(20), comment: "下载次数" },
    file_name: { type: Sequelize.STRING(255), comment: "文件名" },
    file_path: { type: Sequelize.STRING(255), comment: "文件路径,相对于upload目录,可以为url" },
    suffix: { type: Sequelize.STRING(255), comment: "文件后缀名,不包括点" },
    created_at: Sequelize.BIGINT(11),
    more: { type: Sequelize.TEXT, comment: "其它详细信息,JSON格式" }
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = code;