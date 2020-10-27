var configDefault = require("./config.default");
var configLocal = require("./config.local");

/**
 * 生产环境，配置文件切换
 */
if (process.env.NODE_ENV == "production") {
  module.exports = configDefault;
} else {
  module.exports = configLocal;
}
