var express = require('express');
var app = express();
var morgan = require('morgan');
var busboy = require('connect-busboy');
var path = require('path');
var tesseract = require('node-tesseract');
var fs = require('fs');
var gm = require('gm');
// var utils = require("./utils")

app.use(morgan('dev'));

swig = require('swig');
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view cache', false);
swig.setDefaults({ cache: false });

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/scan', function(req, res){
  res.render('scan');
});


app.post('/upload', upload.single('image'), function(req, res){
  var image = req.file;
  console.log(image);
  if (image.mimetype == "application/pdf"){
    gm(image.buffer, image.originalname)
    .toBuffer('TIFF', function(err, buffer){
      if(err) console.log(err);
      image.mimetype="application/pdf";
      image.buffer = buffer;
      var embed = "data:" + image.mimetype + ";base64," + image.buffer;
      console.log(image);
      res.render('view', {application:embed});
    });
  }




  // if (image.mimetype.split('/')[0] == "image"){
  //   res.render('view', {image:embed});
  // }else if(image.mimetype.split('/')[0] == "application"){
  //   var tiffbuffer = req.file.buffer;
  //   res.render('view', {application:embed});
  //   gm(req.file.buffer)
  //   .toBuffer('TIFF', function(err, buffer){
  //     if(err) {
  //       console.log(err);
  //       return err;
  //     }
  //     tiffbuffer = buffer;
  //     image.mimetype = "application/tiff";
  //     console.log(tiffbuffer);
  //   });
  // }
});

app.get('/view', function(req, res){
  res.render('view', {imageName:imageName});
});


app.listen(3000);
console.log("Server started on port 3000");
