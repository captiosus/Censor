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
      console.log("received response");
    })
  },
  accept:function(file, done){
    console.log("new file!", file);
    done();
  },

}
