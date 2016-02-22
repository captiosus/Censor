Dropzone.options.imagedropzone = {
  paramName:"image",
  maxFilesize: 2,
  uploadMultiple: false,
  autoProcessQueue:false,
  init:function(){
    // var submitButton = document.querySelector("#upload")
    var thisdropzone = this;
    // submitButton.addEventListener("click", function() {
    //   thisdropzone.processQueue();
    // });

    this.on('thumbnail', function(file, dataUrl){
      var thumbnails = document.getElementById('image-list').getElementsByTagName('img');
      for(var i = 0; i < thumbnails.length; i++){
        var thumbnail = thumbnails[i];
        if (thumbnail.getAttribute('alt') == file.name){
          console.log("match!");
          thumbnail.onclick =  function(){
            console.log("processingfile", file.filename);
            thisdropzone.processFile(file);
          };
        }
      }
    })
    this.on('queuecomplete', function(){
      console.log("Queue completed");
    });
    this.on('success', function(file, res, err){

      console.log(res);
      drawBoxes(file, res);
    })
  },
  accept:function(file, done){
    console.log("new file!", file);
    done();
  },
}

var drawBoxes = function(image, boxfile){
  var c = document.getElementById('censorme');
  console.log(c);
  c.style.visibility = 'visible';
  c.style.zIndex = 2;
  var ctx = c.getContext("2d");
  // ctx.drawImage(, 0, 0);
  boxfile = boxfile.split('\n');
  console.log(boxfile);
  var boxes = []
  for (var line in boxfile){
    line = boxfile[line].split(' ');//Char = index 0; xtopleft = index 1; ytopleft = index 2; xbottomright = index 3; ybottomright = index 4
    var box = [line[0]];
    console.log(line);
    for (var i = 1; i < line.length - 1; i++){
      box.push( parseInt(line[i]) * 2 / 10 );
    }
    console.log(box);
    ctx.beginPath();
    ctx.rect(box[1], c.height - box[2], Math.abs(box[3] - box[1]), -1 * Math.abs(box[4] - box[2]));
    ctx.stroke();
    boxes.push(box);
  }
};
