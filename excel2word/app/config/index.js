
/**
 * 配置文件
 */

// 表单字段配置
const FORM_FILED = [{
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

// 模版路径
const TEMPLATE_PATH = '../public/doc/template.doc';

// 文档生成路径
const TARGET_PATH = '../public/doc/target.doc';

module.exports = {
  FORM_FILED,
  TEMPLATE_PATH,
  TARGET_PATH
};