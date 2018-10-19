var express = require('express');
var router = express.Router();
var path = require('path');

const multer  = require('multer')
const empty = require('empty-folder')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.mimetype.includes('image/')) {
      cb(null,path.join(rootDir,'uploads','SS'));
    } else {
      cb(null,path.join(rootDir,'uploads','code'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(rootDir,'views','index.html'));
});

router.post('/', upload.any(),function(req, res, next) {

    let lang = req.body.lang;
    let beautifier  = require('../service/formatter/beautifier')(lang);
    let pdfGenerator = require('../service/pdf/pdf').pdfGenerator;

    let fileLoc = beautifier(req.files[0].path)
      
    pdfGenerator([fileLoc,req.files[1].path])
      .then((pdfFileLoc) => {
        res.download(pdfFileLoc);
        return pdfFileLoc;
      })
      .then((pdfFileLoc) => {
        setTimeout(() => {
          empty(path.dirname(pdfFileLoc),false,()=>{});
          empty(path.dirname(req.files[1].path),false,()=>{});
          empty(path.dirname(req.files[0].path),false,()=>{});
        },5000);
      })
      .catch((err) => {
        console.log(err);
      });

      

});




module.exports = router;
