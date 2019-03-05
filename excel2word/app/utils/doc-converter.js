// eslint-disable-next-line strict
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

/**
 *  文档转化器
 *  @class DocCanverter
 *  @function parse 文档转化方法
 */
class DocCanverter {
    constructor() {
        this._docParser = new Docxtemplater();
    }

    parse(docTemplateBuffer, docData) {
        var zip = new JSZip(docTemplateBuffer);
        this._docParser.loadZip(zip);

        this._docParser.setData(docData);

        try {
            this._docParser.render()
        } catch (error) {
            const e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({
                error: e
            }));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }

        return this._docParser.getZip()
            .generate({
                type: 'nodebuffer'
            });
    }
}

module.exports = DocCanverter;