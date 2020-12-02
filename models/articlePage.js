'use strict';

var Sequelize = require("sequelize");
var db = require('./db');

var Page = db.define('tb_article_page',
  {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.BIGINT, allowNull: false },
    category_id: { type: Sequelize.BIGINT, allowNull: true },
    title: { type: Sequelize.STRING(255), allowNull: false },
    thumbnail: Sequelize.STRING(255),
    content: { type: Sequelize.STRING, allowNull: false },
    description: Sequelize.TEXT,
    more: Sequelize.TEXT,
    created_at: Sequelize.BIGINT(11),
    updated_at: Sequelize.BIGINT(11),
    deleted_at: Sequelize.BIGINT(11),
    status: Sequelize.BIGINT(11),
    url: Sequelize.STRING(255),
    hit_counter: Sequelize.BIGINT(11),
    list_order: Sequelize.BIGINT(11),
    is_show: Sequelize.BIGINT(11),
    // createTime: { field: 'created_at', type: Sequelize.DATE, allowNull: false },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Page;


