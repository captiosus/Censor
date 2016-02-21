var express = require('express');
var app = express();
var path = require('path');
var tesseract = require('node-tesseract');
var fs = require('fs');
var utils = require("./utils")

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

app.post('/upload', function(req, res){
  fs.readFile(req.files.image.path, function(err, data){
    var imageName = req.files.image.name;
    if (!imageName){
      console.log("There was an error uploading this file");
      res.redirect('/scan');
      res.end();
    }else{
      var newPath = __dirname + "/uploads/uncensored/" + imageName;
      fs.writeFile(newPath, data, function(err){
        res.redirect("/view/" + imageName);
      });
    }
  });
});


app.listen(3000);