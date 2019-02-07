'use strict';

module.exports = app => {
    const {router, controller} = app;
    const auth = app.middleware.auth(app);

    router.get('/', controller.home.index);
    router.get('/test', auth, controller.home.test);

    //v1路由
    router.post('/api/v1/login', controller.v1.api.auth.login);
    router.post('/api/v1/test', auth, controller.home.test);
};
