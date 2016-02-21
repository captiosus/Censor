Dropzone.options.imagedropzone = {
  paramName:"image",
  maxFilesize: 2,
  uploadMultiple: true,
  init:function(){
    this.on('completemultiple', function(files){
      console.log("uploaded!");
    })
  }
}
