'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const DocConverter = require('../utils/doc-converter');
const dc = new DocConverter();
const word2pdf = require('word2pdf');

const doctpl = fs.readFileSync(path.resolve(__dirname, '../public/doc/template.doc'), 'binary');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let formField = [{
      key: 'name',
      name: '姓名',
      value: '',
    },
    {
      key: 'age',
      name: '年龄',
      value: '',
    },
    ];
    formField = JSON.stringify(formField);
    await this.ctx.render('main.vue', { formField });
  }

  async print() {
    const printMap = this.ctx.request.body;
    const buf = dc.parse(doctpl, printMap);
    fs.writeFileSync(path.resolve(__dirname, '../public/doc/target.doc'), buf);
    this.ctx.body = {
      ok: true,
    };
  }
}

module.exports = HomeController;
