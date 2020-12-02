'use strict';

var Sequelize = require("sequelize");
var db = require('./db');

var itemCategory = db.define('tb_item_category',
  {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
    title: { type: Sequelize.STRING(50), allowNull: false },
    parent_id: { type: Sequelize.BIGINT, allowNull: false },
    parent_title: Sequelize.STRING(50),
    description: Sequelize.TEXT,
    thumbnail: Sequelize.STRING(255),
    list_order: Sequelize.BIGINT(11),
    created_at: Sequelize.BIGINT(11),
    is_show: Sequelize.BIGINT(11)
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = itemCategory;
