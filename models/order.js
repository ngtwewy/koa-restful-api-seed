var Sequelize = require("sequelize");
var db = require('./db');

var User = db.define('tb_order',
  {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
    item_id: Sequelize.BIGINT(11),
    counter: Sequelize.BIGINT(11),
    name: Sequelize.STRING(100),
    phone: Sequelize.STRING(30),
    payment: Sequelize.STRING(60),
    address: Sequelize.STRING(200),
    address_info: Sequelize.TEXT,
    remark: Sequelize.TEXT,
    created_at: Sequelize.BIGINT(11),
    order_id: Sequelize.STRING(120),
    status: Sequelize.INTEGER
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = User;
