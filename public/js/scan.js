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

    this.on('queuecomplete', function(){
      console.log("Queue completed");
    });
    this.on('success', function(file, res, err){
      console.log('res', res);
      console.log("received response");
      document.getElementById("response").html = res;
    })
  },
  accept:function(file, done){
    console.log("new file!", file);
    done();
  },

}
