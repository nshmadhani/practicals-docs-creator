const pdfGenereator = require('./pdf').pdfGenerator;



const path = require('path');


let rootDir = path.dirname(path.dirname(__dirname));





module.exports = () => {
    
}


pdfGenereator(path.join(rootDir,'test','test.c'),path.join(rootDir,'test','Screenshot from 2018-10-10 10-56-41.png'),'./a.pdf')
    .then((psfFileLoc) => {

    })
    .catch((err) => {
        console.log(err);
    });
