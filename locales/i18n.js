'use strict';

var i18n = require('i18n');
var config = require('../config');

i18n.configure({
  locales: ['en-US', 'zh-CN'],
  // defaultLocale: 'zh-CN',
  // defaultLocale: 'en-US',
  defaultLocale: config.languange,
  directory: './locales', // __dirname + '/locales'
  updateFiles: false,
  indent: "\t",
  extension: '.json'
});

module.exports = function (app) {
  // default: using 'accept-language' header to guess language settings
  app.use(i18n.init);
};
