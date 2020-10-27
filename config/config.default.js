module.exports = {
  // 系统信息
  systemInfo: {
    "name": "koa-restful-api-seed",
    "version": "v1.1.20201027",
    "document_url": "https://restfulapi.cn/manual"
  },
  // 服务器配置
  SERVICE: {
    HOST: "",
    PORT: "3000"
  },
  // 数据库连接配置
  database: {
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    database: 'cn_net_javascript',
    port: 3306,
    connection_limit: 10
  },
  languange: 'zh-CN',
  siteUrl: 'http://127.0.0.1:3000',
  jwt: {
    secret: 'shared-secret'
  },
  verificationCode: {
    isTest: true, // 为真的话不发送验证码，并且在返回数据中给出验证码
    length: 4
  },
  smtp: {
    host: 'smtp.exmail.qq.com',
    port: 465,
    nickname: '*****.cn',
    username: 'mail@*****.cn',
    password: '******'
  },
  sms: {
    isSend: true, //是否真实发送验证码
    maximumTimesByIP: 5, //对每个IP的发送次数
    maximumTimesByMobile: 5, //对每个手机号的发送次数
    apikey: "da9a370e74f0024cddb192d*********",
    mobile: "17796******", //测试手机号
    text: "【测试APP】您的验证码是#code#。如非本人操作，请忽略本短信",
    tpl_id: "3140166",// 指定发送的模板编号
  }
};

