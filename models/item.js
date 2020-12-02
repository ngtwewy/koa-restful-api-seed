'use strict';

var Sequelize = require("sequelize");
var db = require('./db');

var item = db.define('tb_item',
  {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
    title: { type: Sequelize.STRING(250), allowNull: false },
    thumbnail: Sequelize.STRING(250),
    brand: Sequelize.STRING(250),
    sold: Sequelize.STRING(100),
    counter: Sequelize.STRING(100),
    material: Sequelize.STRING(255),
    on_time: Sequelize.STRING(100),
    my_size: Sequelize.STRING(100),
    color: Sequelize.STRING(100),
    price1: Sequelize.STRING(60),
    price2: Sequelize.STRING(60),
    price3: Sequelize.STRING(60),
    content: Sequelize.TEXT,
    category: Sequelize.STRING(100),
    category_id: { type: Sequelize.BIGINT, allowNull: false },
    url: Sequelize.STRING(255),
    url_id: Sequelize.STRING(50),
    parent_id: Sequelize.STRING(50),
    parent_title: Sequelize.STRING(100),
    more: Sequelize.TEXT,
    created_at: Sequelize.BIGINT,
    is_show: Sequelize.BIGINT,
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = item;

