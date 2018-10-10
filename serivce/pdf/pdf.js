const html_pdf = require('html-pdf');
var options = {format: 'A4'};
const path = require('path')
const fs = require('fs');




let pdfGenerator = (codePath, ssPath,outputPdfFile) => {
    let templateStr = fs.readFileSync('template.html').toString();


    templateStr = templateStr.replace('${CODE}', fs.readFileSync(codePath).toString())
                     .replace('${SS_IMG}', ssPath);


    return new Promise((resolve,reject) => {
        html_pdf.create(templateStr, options).toFile(outputPdfFile, function (err, res) {
            if (err) reject(err)
            else resolve(outputPdfFile);
        });
    });
}

module.exports = {
    pdfGenerator
} 