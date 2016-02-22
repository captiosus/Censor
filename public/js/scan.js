var thumbnail;
var loading = document.getElementById("loading");
var savebar = document.getElementById("savebar");
var main = document.getElementById("main");
var instructions = document.getElementById("instructions");
var upload_more = document.getElementById("upload-more");
var done = document.getElementById("done");
var c = document.getElementById('censorme');
var ctx = c.getContext("2d");
var thumb_src;
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
          (((thumbnail.parentNode).parentNode).parentNode).onclick = function(){
            c.style.display = "none";
            ctx.clearRect(0,0,600, 450);
            main.style.display = "none";
            loading.style.display = "block";
            thumb_src = this.getElementsByTagName("img")[0].getAttribute('src');
            thisdropzone.processFile(file);
          };
        }
      }
    });
    this.on('success', function(file, res, err){
      drawBoxes(file, res);
      loading.style.display = "none";
      savebar.style.display = "block";
    });
    this.on('addedfile', function(file) {
      if (!file.type.match(/image.*/)) {
        this.emit("thumbnail", file, "../image/pdf.png");
      }
      instructions.innerHTML = "CLICK ON IMAGE ON SIDEBAR OR UPLOAD MORE IMAGES";
    });
  },
  accept:function(file, done){
    done();
  }
}
upload_more.addEventListener("click", function(e) {
  e.preventDefault();
  c.style.display = "none";
  main.style.display ="block";
  savebar.style.display = "none";
})

var c, ctx, height, boxes = [];
var height;
var width;
var boxes = [];
var drawBoxes = function(image, boxfile){
  c.style.display = 'block';
  var img = new Image();
  img.src = thumb_src;
  var aspect_ratio = image.height / image.width;
  var inv_aspect_ratio = image.width / image.height;
  if (image.width > 600) {
    height = 600 * aspect_ratio;
    width = 600;
    if (height > 450) {
      height = 450;
      width = 450 * width / height;
    }
  }
  else if (image.height > 450) {
    width = 450 * inv_aspect_ratio;
    height = 450;
    if (width > 600) {
      width = 600;
      height = 600 * height / width;
    }
  }
  else {
    height = image.height;
    width = image.width;
  }
  var margin_x = (600 - width) / 2;
  var hratio = height / image.height;
  var wratio = width / image.width;
  ctx.drawImage(img, margin_x, 0, width, height);
  boxfile = boxfile.split('\n');
  for (var line in boxfile){
    line = boxfile[line].split(' ');//Char = index 0; xtopleft = index 1; ytopleft = index 2; xbottomright = index 3; ybottomright = index 4
    var box = [line[0]];
    for (var i = 1; i < line.length - 1; i++){
      box.push( parseInt(line[i]) * wratio );
      box.push( parseInt(line[++i]) * hratio);
    }
    ctx.beginPath();
    ctx.rect(box[1] + margin_x, height - box[2], Math.abs(box[3] - box[1]), -1 * Math.abs(box[4] - box[2]));
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
