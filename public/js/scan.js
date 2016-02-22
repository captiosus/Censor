var main = document.getElementById("main");
var loading = document.getElementById("loading");
var savebar = document.getElementById("savebar");
var thumbnail;
Dropzone.options.imagedropzone = {
  paramName:"image",
  maxFilesize: 2,
  uploadMultiple: false,
  autoProcessQueue:false,
  init:function(){
    var submitButton = document.querySelector("#upload");
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
          thumbnail.onclick = function(){
            console.log("processingfile", file.filename);
            main.innerHTML = "";
            loading.style.display = "block";
            thisdropzone.processFile(file);
          };
        }
      }
    });
    this.on('queuecomplete', function(){
      console.log("Queue completed");
    });
    this.on('success', function(file, res, err){
      console.log(res);
      console.log("received response");
      loading.style.display = "none";
      savebar.style.display = "block";
      main.innerHTML = "<img src=\"" + thumbnail.getAttribute('src') + "\"/>";
    });
  },
  accept:function(file, done){
    console.log("new file!", file);
    done();
  },

};
