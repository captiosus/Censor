Dropzone.options.imagedropzone = {
  paramName:"image",
  maxFilesize: 2,
  uploadMultiple: false,
  autoProcessQueue:false,
  init:function(){
    var submitButton = document.querySelector("#upload")
    var thisdropzone = this;
    submitButton.addEventListener("click", function() {
      this.processQueue();
    });

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
      drawBoxes(res);
    })
  },
  accept:function(file, done){
    console.log("new file!", file);
    done();
  },
}

var drawBoxes = function(boxfile){
  var c = document.getElementById('censorme');
  c.style.visibility = 'visible';
  var ctx = c.getContext('2D');
  boxfile = boxfile.split('\n');
  var boxes = []
  for (var line in boxfile){
    line = line.strip().split(\' ');//Char = index 0; xtopleft = index 1; ytopleft = index 2; xbottomright = index 3; ybottomright = index 4
    var box = [line[0]];
    for (var i = 1; i < line.length - 1; i++){
      box.push( parseInt(line[i]) * 7 / 10 );
    }
    ctx.rect(box[1], box[2], box[3] - box[1], box[4] - box[2]);
    ctx.stroke();
    boxes.push(box);
  }
};
