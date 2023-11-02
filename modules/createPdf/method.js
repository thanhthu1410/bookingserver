"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPDF = void 0;
const fs = require("fs");
const ejs = require("ejs");
const pdf = require("html-pdf");
const createPDF = (data) => {
    return new Promise((resolve, reject) => {
        var ejsTemplate = fs.readFileSync('./pdf.ejs', 'utf8');
        var html = ejs.render(ejsTemplate, data);
        var options = { format: 'Letter' };
        pdf.create(html, options).toFile('./yourReceipt.pdf', function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                console.log(res);
                resolve();
            }
        });
    });
};
exports.createPDF = createPDF;
//# sourceMappingURL=method.js.map