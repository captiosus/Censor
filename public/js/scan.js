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
})

var drawBoxes = function(image, boxfile){
  c.style.display = 'block';
  var img = new Image();
  img.src = thumb_src;
  var aspect_ratio = image.height / image.width;
  var height = 600 * aspect_ratio;
  var ratio = height / image.height;
  ctx.drawImage(img, 0, 0, 600, height);
  boxfile = boxfile.split('\n');
  var boxes = []
  for (var line in boxfile){
    line = boxfile[line].split(' ');//Char = index 0; xtopleft = index 1; ytopleft = index 2; xbottomright = index 3; ybottomright = index 4
    var box = [line[0]];
    for (var i = 1; i < line.length - 1; i++){
      box.push( parseInt(line[i]) * ratio );
    }
    ctx.beginPath();
    ctx.rect(box[1], height - box[2], Math.abs(box[3] - box[1]), -1 * Math.abs(box[4] - box[2]));
    ctx.stroke();
    boxes.push(box);
  }
};
