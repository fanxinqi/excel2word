/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551775336321_1886';

  // add your middleware config here
  config.middleware = [];

  // add view Engine
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.vue': 'nunjucks',
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 上传配置
  config.multipart = {
    fileSize: '50mb',
    fileExtensions: [
      '.doc',
    ]
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};