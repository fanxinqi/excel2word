"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const pump = require('mz-modules/pump');


const conf = require("../config");
const DocConverter = require("../utils/doc-converter"); //文档转化器

// 模版二进制流
const doctpl = fs.readFileSync(
  path.resolve(__dirname, conf.TEMPLATE_PATH),
  "binary"
);

const dc = new DocConverter(doctpl);



class HomeController extends Controller {
  // 首页路由
  async index() {
    await this.ctx.render('main.vue', {
      FORM_FILED: JSON.stringify(conf.FORM_FILED)
    });
  }

  // 打印表单路由
  async printForm() {
    const printMap = this.ctx.request.body;
    updateTargetDoc(printMap);
    this.ctx.body = {
      ok: true,
    };
  }
  // 上传路由
  async upload() {
    const stream = await this.ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/template.doc');
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);

    this.ctx.body = {
      url: '/public/' + filename
    }
  }
}


// 按照模版填充数据
function updateTargetDoc(printMap) {
  fs.writeFileSync(path.resolve(__dirname, conf.TARGET_PATH), dc.parse(printMap));
}

module.exports = HomeController;