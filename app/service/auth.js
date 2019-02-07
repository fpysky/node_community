const Service = require('egg').Service;
const crypto = require('crypto');

class AuthService extends Service {
    async login(args) {
        const {app, ctx} = this;
        let user;
        let isLogin = 1;
        if (args.type == 1) {
            //记得从缓存冲拿验证码并校验
            //const verify_code = ''
            // if(verify_code != args.verify_code) return {code:1,msg:'验证码错误'};
            user = await app.model.User.find({'where': {phone_number: args.phone_number}});
            if (!user) {
                user = await app.model.User.create({phone_number: args.phone_number});
                isLogin = 0;
            }
        } else {
            args.password = await crypto.createHash('md5').update(args.password).digest('hex');
            user = await app.model.User.find({'where': {phone_number: args.phone_number}});
            if (!user) user = await app.model.User.find({'where': {account: args.account}});
            if (!user) return {code: 1, msg: '用户不存在'};
            if (user.password != args.password) return {code: 1, msg: '密码错误'};
        }
        const sign = JSON.parse(JSON.stringify(user));
        const token = await app.jwt.sign(sign, app.config.jwt.secret, {expiresIn: 60 * 60 * 8});
        ctx.cookies.set('token', token, {maxAge: 60 * 1000, httpOnly: false, overwrite: true, signed: false});
        return {code: 0, msg: '登陆成功', isLogin: isLogin}
    }
}

module.exports = AuthService;