var Sequelize = require("sequelize");
var db = require('./db');

var code = db.define('tb_code',
  {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
    code: Sequelize.STRING(25),
    account: Sequelize.STRING(100),
    is_used: Sequelize.INTEGER,
    ip: Sequelize.STRING(128),
    flag: Sequelize.STRING(50),
    created_at: Sequelize.BIGINT(11),
    expired_at: Sequelize.BIGINT(11)
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = code;
