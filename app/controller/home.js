'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }

    //测试方法
    async test() {
        const res = await this.app.mysql.query('select * from test');
        console.log(res, 'res');
        this.ctx.body = 'hi, test';
    }
}

module.exports = HomeController;
