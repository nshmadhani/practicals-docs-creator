const html_pdf = require('html-pdf');
var options = {format: 'A4'};
const path = require('path')
const fs = require('fs');
const escape = require('escape-html');



let pdfGenerator = (paths) => {


    let outputPdfFile = path.join(global.rootDir,'temp',(Date.now()) + ".pdf");
    
    let templateStr = fs.readFileSync(path.join(__dirname,'template.html')).toString();


    let codeStr  = fs.readFileSync(paths[0]).toString();


    templateStr = templateStr.replace('${CODE}', escape(codeStr))
                             .replace('${SS_IMG}', paths[1]);

    

    fs.writeFileSync("template1.html",templateStr);

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