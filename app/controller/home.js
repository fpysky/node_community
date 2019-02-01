'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async index1() {
    this.ctx.body = 'hi, egg11';
  }
}

module.exports = HomeController;
