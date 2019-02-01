'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1549037182088_4857';

    //开发阶段取消csrf保护
    config.security = {
        csrf: {
            enable: false,
        }
    };
    // add your config here
    config.middleware = [];

    return config;
};
