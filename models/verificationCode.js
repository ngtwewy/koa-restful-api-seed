var Sequelize = require("sequelize");
var db = require('./db');

var verificationCode = db.define('tb_verification_code',
  {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
    code: Sequelize.STRING(25),
    account: Sequelize.STRING(100),
    is_used: Sequelize.INTEGER,
    ip: Sequelize.STRING(128),
    flag: Sequelize.STRING(50),
    create_time: Sequelize.BIGINT(11),
    expire_time: Sequelize.BIGINT(11)
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = verificationCode;
