var Sequelize = require("sequelize");
var db = require('./db');

var User = db.define('tb_user',
  {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
    username: Sequelize.STRING(100),
    nickname: Sequelize.STRING(100),
    email: Sequelize.STRING(100),
    mobile: Sequelize.STRING(20),
    password: Sequelize.STRING(100),
    gender: Sequelize.BIGINT(11),
    birthday: Sequelize.BIGINT(11),
    score: Sequelize.BIGINT(11),
    coin: Sequelize.BIGINT(11),
    balance: Sequelize.DECIMAL(10, 2),
    avatar: Sequelize.STRING(100),
    signature: Sequelize.STRING(255),
    last_login_ip: Sequelize.STRING(15),
    key: Sequelize.STRING(100),
    more: Sequelize.TEXT,
    address: Sequelize.STRING(255),
    type: Sequelize.INTEGER,
    uuid: Sequelize.STRING(128),
    created_at: Sequelize.BIGINT(11),
    logined_at: Sequelize.BIGINT(11),
    updated_at: Sequelize.BIGINT(11),
    status: Sequelize.INTEGER
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = User;
