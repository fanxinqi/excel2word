'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.index);
  router.post('/print', controller.home.printForm);
  router.post('/upload', controller.home.upload);
};