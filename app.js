var express = require('express');
var app = express();
var morgan = require('morgan');
var multer = require('multer');
var upload = multer({dest:'temp/'});
var path = require('path');
var tesseract = require('node-tesseract');
var fs = require('fs');
// var utils = require("./utils")

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
});

console.log(__dirname);
app.get('/view', function(req, res){
  res.render('view', {imageName:imageName});
  res.end();
});


app.listen(3000);
console.log("Server started on port 3000");
