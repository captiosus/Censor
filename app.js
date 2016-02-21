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

app.use(busboy());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/scan', function(req, res){
  res.render('scan');
});


app.get('/view', function(req, res){
  res.render('view', {imageName:imageName});
});

app.use(function(req, res, next){
  if(req.busboy){
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
      console.log(fieldname);
      if(!req.files) req.files = [];
      req.files.push({
        fieldname:fieldname,
        file:file,
        filename:filename,
        encoding:encoding,
        mimetype:mimetype
      });
      console.log(filename);
      console.log(req.files);
      console.log("fileprocess");
      file.resume();
    });
    req.busboy.on('finish', function(){
      console.log("uploaded");
      next();
    });
    req.pipe(req.busboy);
  }
});
app.post('/upload', function(req, res){
  console.log('hi');
  console.log(req.files);
  res.send(JSON.stringify(req.files));
})


app.listen(3000);
console.log("Server started on port 3000");
