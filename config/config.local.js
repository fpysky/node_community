'use strict';

module.exports = appInfo => {
    const config = exports = {};

    config.keys = appInfo.name + '_1549037182088_4857';

    //开发阶段去除CSRF保护
    config.security = {
        csrf: {
            enable: false,
        }
    };

    //中间件
    config.middleware = [];

    //mysql主库配置 egg-mysql
    config.mysql = {
        client: {
            host: '192.168.10.10',
            port: 3306,
            user: 'homestead',
            password: 'secret',
            database: 'node_community',
        },
        app: true,
        agent: false,
    };

    //mysql主库配置 egg-sequelize
    config.sequelize = {
        dialect: 'mysql',
        host: '192.168.10.10',
        port: 3306,
        username: 'homestead',
        database: 'node_community',
        password: "secret",
    };

    //JWT密钥
    exports.jwt = {
        secret: config.keys
    };

    return config;
};
