module.exports = {
  apps: [{
    name: 'cnrestfulapi',
    script: './server.js',
    env: {
      NODE_ENV: 'production'
    },
    watch: false,
    ignore_watch: ['node_modules', 'build', 'logs'],
    out_file: './logs/out.log', // 日志输出
    error_file: './logs/error.log', // 错误日志
    max_memory_restart: '1G', // 超过多大内存自动重启，仅防止内存泄露，根据自己的业务设置
    exec_mode: 'cluster', // 开启多线程模式，用于负载均衡
    instances: 'max', // 启用多少个实例，可用于负载均衡
    autorestart: true // 程序崩溃后自动重启
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
