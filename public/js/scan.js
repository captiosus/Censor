var thumbnail;
var loading = document.getElementById("loading");
var savebar = document.getElementById("savebar");
var main = document.getElementById("main");
var instructions = document.getElementById("instructions");
Dropzone.options.imagedropzone = {
  paramName:"image",
  maxFilesize: 2,
  uploadMultiple: false,
  autoProcessQueue:false,
  init:function(){
    var thisdropzone = this;
    this.on('thumbnail', function(file, dataUrl){
      var thumbnails = document.getElementById('image-list').getElementsByTagName('img');
      for(var i = 0; i < thumbnails.length; i++){
        thumbnail = thumbnails[i];
        if(thumbnail.getAttribute("width")>=thumbnail.getAttribute("height")){
            thumbnail.style.width="160px";
            thumbnail.style.height="auto";
        }else{
            thumbnail.style.height="160px";
            thumbnail.style.width="auto";
        }
        if (thumbnail.getAttribute('alt') == file.name){
          console.log("match!");
          thumbnail.parentNode.addEventListener('click', function(){
            console.log("processingfile", file.filename);
            main.style.display = "none";
            loading.style.display = "block";
            thisdropzone.processFile(file);
          });
        }
      }
    });
    this.on('success', function(file, res, err){
      drawBoxes(file, res);
      loading.style.display = "none";
      savebar.style.display = "block";
      main.innerHTML = "<img src=\"" + thumbnail.getAttribute('src') + "\"/>";
    });
    this.on('addedfile', function(file) {
      if (!file.type.match(/image.*/)) {
        thisdropzone.emit("thumbnail", file, "http://path/to/image");
      }
      instructions.innerHTML = "CLICK ON IMAGE ON SIDEBAR OR UPLOAD MORE IMAGES";
    });
  },
  accept:function(file, done){
    done();
  }
}

var c, ctx, height, boxes = [];
var height
var boxes = []
var drawBoxes = function(image, boxfile){
  c = document.getElementById('censorme');
  c.style.display = 'block';
  ctx = c.getContext("2d");
  var img = new Image();
  img.src = thumbnail.getAttribute('src')
  var aspect_ratio = image.height / image.width;
  height = 600 * aspect_ratio;
  var hratio = height / image.height;
  var wratio = 600 / image.width;
  ctx.drawImage(img, 0, 0, 600, height);
  boxfile = boxfile.split('\n');
  for (var line in boxfile){
    line = boxfile[line].split(' ');//Char = index 0; xtopleft = index 1; ytopleft = index 2; xbottomright = index 3; ybottomright = index 4
    var box = [line[0]];
    console.log(line);
    for (var i = 1; i < line.length - 1; i++){
      box.push( parseInt(line[i]) * wratio );
      box.push( parseInt(line[++i]) * hratio);
    }
    console.log(box);
    ctx.beginPath();
    ctx.rect(box[1], height - box[2], Math.abs(box[3] - box[1]), -1 * Math.abs(box[4] - box[2]));
    ctx.stroke();
    boxes.push(box);
  }
  c.addEventListener('click', blotsquare);
};

var blotsquare = function(e){
  var x = e.offsetX, y = e.offsetY;
  for (var charindex in boxes){
    var box = boxes[charindex];
    var x1=box[1], x2=box[3], y1 = height - box[2], y2=(height - box[2]) + (-1 * Math.abs(box[4] - box[2]));
    if (x1 <= x && x <= x2 && y1 >= y && y >= y2){
      console.log(box);
      console.log(x1,y1,x2,y2,x,y);
      ctx.fillRect(box[1], height - box[2], Math.abs(box[3] - box[1]), -1 * Math.abs(box[4] - box[2]));
    }
  }
}
