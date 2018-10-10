const path = require('path');
module.exports = (lang) => {
    lang = lang.toLowerCase();
    if (lang === 'JS') {
        return (fileLoc) => {
           
                var beautify = require('js-beautify').js;
                const fs = require('fs');
                let fileData = fs.readFileSync(fileLoc).toString();
                fs.writeFileSync(fileLoc, beautify(fileData, {indent_size: 2}));
                return fileLoc;
            
        }
    } else if (lang === 'c/c++' || lang === 'java') {
        return (fileLoc) => {
            const execa = require('execa');
            try {
                execa.sync(path.join(__dirname,'astyle'),[fileLoc,'-A2',' -t2'])
            } catch(err) {
                
            }
            return fileLoc;            
        }
    }
}