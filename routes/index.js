var express = require('express');
var router = express.Router();
var path = require('path');

const multer  = require('multer')


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
    let beautifier  = require('../serivce/formatter/beatutifier')(lang);

    beautifier(req.files[0].path)
      .then((fileLoc) => {
        console.log(fileLoc);
      })
      .catch((err) => {
        console.log(err);
      });

      

});


module.exports = router;
