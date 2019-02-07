'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
    async login() {
        const {ctx, service} = this;
        const args = ctx.request.body;
        if (!args.type) {
            ctx.body = {code: 1, msg: 'type不能为空'};
            return;
        }
        let rules = {};
        if (args.type == 1) {
            rules = {
                phone_number: {type: 'string', required: true},
                verify_code: {type: 'string', required: true}
            }
        } else {
            if (!args.phone_number) {
                ctx.body = {code: 1, msg: '手机号不能为空'};
                rules = {
                    account: {type: 'string', required: true},
                    password: {type: 'string', required: true}
                }
            } else {
                rules = {
                    phone_number: {type: 'string', required: true},
                    password: {type: 'string', required: true}
                }
            }

        }
        try {
            await ctx.validate(rules)
        } catch (err) {
            ctx.body = {code: 1, msg: '参数错误', err: err.errors};
            return;
        }
        ctx.body = await service.auth.login(args);
    }
}

module.exports = AuthController;
