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
      if(!req.files) req.files = [];
      var filepath = __dirname + "/uploads/" + filename;
      req.files.push({
        fieldname:fieldname,
        file:file,
        filename:filename,
        encoding:encoding,
        mimetype:mimetype,
        filepath: filepath
      });
      var fstream = fs.createWriteStream(filepath);
      file.pipe(fstream);
      fstream.on("close", function(){
        console.log("finished file", file);
      })
    });
    req.busboy.on('finish', function(){
      console.log("uploaded");
      next();
    });
    req.pipe(req.busboy);
  }
});

app.post('/upload', function(req, res){
  var files = req.files;
  for (var i = 0; i < files.length; i++){
    var tessoptions = {
      config:"hocr"
    }
    var file = files[i];
    if (file.mimetype == "application/pdf"){
      var newfilepath = __dirname + "/uploads/" + file.filename.replace(/\.[^/.]+$/, "") + ".tiff";
      var im = gm.subClass({imagemagick:true});
      im(file.filepath)
      .density(500,500)
      .write(newfilepath, function(err){
        if (err) console.log(err);
        if (!err){
          file.filename = file.filename.replace(/\.[^/.]+$/, "") + ".tiff"
          file.filepath = newfilepath;
          file.mimetype = "image/tiff";

          tesseract.process(file.filepath, tessoptions, function(err, text){
            res.send(text);
          });
        }
      });
    }else{
      tesseract.process(file.filepath, tessoptions, function(file, text){
        res.send(text);
      });
    }
  }
})


app.listen(3000);
console.log("Server started on port 3000");
