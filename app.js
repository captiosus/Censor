var express = require('express');
var app = express();
var morgan = require('morgan');
var multer = require('multer');
var path = require('path');
var tesseract = require('node-tesseract');
var fs = require('fs');
// var utils = require("./utils")

var storage = multer.memoryStorage();
var limits = { fileSize:2000000 };
var upload = multer({storage:storage, limits:limits});

app.use(morgan('combined'));

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
  var embed = "data:" + image.mimetype + ";base64,"  + image.buffer.toString('base64');
  if (image.mimetype.split('/')[0] == "image"){
    res.render('view', {image:embed});
  }else if(image.mimetype.split('/')[0] == "application"){
    res.render('view', {application:embed});
  }
});

app.get('/view', function(req, res){
  res.render('view', {imageName:imageName});
});


app.listen(3000);
console.log("Server started on port 3000");
