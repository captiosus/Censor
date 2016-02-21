Dropzone.options.imagedropzone = {
  paramName:"image",
  maxFilesize: 2,
  uploadMultiple: true,
  autoProcessQueue:false,
  init:function(){
    var submitButton = document.querySelector("#upload")
    myDropzone = this;

    submitButton.addEventListener("click", function() {
      myDropzone.processQueue();
    });

    this.on("addedfile", function() {
    });
    this.on('completemultiple', function(files){
      console.log("uploaded!");
    });
    this.on('addedfile', function(file, err){
      console.log("added", file);
      console.log("err", err);
    });
    this.on('queuecomplete', function(){
      console.log("done!");
    });
    this.on('success', function(err, res){
      console.log("err", err);
      console.log("res", res);
    })
  },
  accept:function(file, done){
    console.log("new file!", file);
    done();
  },

}
