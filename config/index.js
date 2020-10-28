var development = require("./config.development");
var production = require("./config.production");

/**
 * 生产环境，配置文件切换
 */
if (process.env.NODE_ENV == "production") {
  module.exports = production;
} else {
  module.exports = development;
}
