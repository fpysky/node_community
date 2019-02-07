module.exports = app => {
    const jwt = require('jsonwebtoken');
    return async function (ctx, next) {
        if (ctx.request.header['authorization']) {
            let token = ctx.request.header['authorization'].split(' ')[1];
            let decoded = ''
            try {
                decoded = jwt.verify(token, app.config.jwt.secret);
                app.user = decoded;
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    //重新发放令牌
                    // const user = {user_id: 1,user_name: '张三'}
                    // const sign = JSON.parse(JSON.stringify(user))
                    // token = await jwt.sign(sign, app.config.jwt.secret,{expiresIn: 60 * 60 * 8});
                    // ctx.cookies.set('token', token, {
                    //     maxAge: 60 * 1000 * 60 * 8,
                    //     httpOnly: false,
                    //     overwrite: true,
                    //     signed: false
                    // });
                    ctx.status = 401;
                    ctx.body = {code: 401, msg: 'token失效,请重新登陆'}
                    return;
                } else {
                    ctx.status = 401;
                    ctx.body = {code: 401, msg: 'token失效'}
                    return;
                }
            }
            //重置cookie时间
            ctx.cookies.set('token', token, {
                maxAge: 60 * 1000,
                httpOnly: false,
                overwrite: true,
                signed: false
            });
            await next();
        } else {
            ctx.status = 401;
            ctx.body = {code: 401, msg: '没有token'}
            return;
        }
    }
};