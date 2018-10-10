const html_pdf = require('html-pdf');
var options = {format: 'A4'};
const path = require('path')
const fs = require('fs');




let pdfGenerator = (paths) => {



    let outputPdfFile = path.join(global.rootDir,'temp',(Date.now()) + ".pdf");
    
    let templateStr = fs.readFileSync(path.join(__dirname,'template.html')).toString();



    templateStr = templateStr.replace('${CODE}', fs.readFileSync(paths[0]).toString())
                     .replace('${SS_IMG}', paths[1]);

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