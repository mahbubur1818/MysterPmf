
$("#file").on("change", function (e) {
    var file = $(this)[0].files[0];
    var upload = new Upload(file);
    let size = upload.getSize()
    let type = upload.getType()
    let name = upload.getName()
    $('#warning').text("");
    var DoUpload = true;
    $('#warning').css({'color':'red'})
    if (size > (1024*512)){
      $('#warning').text("Sorry, file should be less than 512KB")
      var DoUpload = false;
    }

    console.log(typeof(type))
    var a = type.slice(0,5)
    if (a != 'image'){
      var DoUpload = false;
      $('#warning').text("Invalid Format")
    } //catch (e) {
      //var DoUpload = false;
    //}
    if(name.length > 100){
      $('#warning').text("Filename is too large")
      var DoUpload = false;
    }

    // execute upload
    if (DoUpload){
    upload.doUpload();
    }
});



var Upload = function (file) {
    this.file = file;
};

Upload.prototype.getType = function() {
    return this.file.type;
};
Upload.prototype.getSize = function() {
    return this.file.size;
};
Upload.prototype.getName = function() {
    return this.file.name;
};
Upload.prototype.doUpload = function () {
    var that = this;
    var formData = new FormData();

    // add assoc key values, this will be posts values
    formData.append("file", this.file, this.getName());
    formData.append("upload_file", true);

    $.ajax({
        type: "POST",
        url: "/qrCodeGenerator/process/upload",
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', that.progressHandling, false);
            }
            return myXhr;
        },
        success: function (data) {
          console.log(data)
            if (data['status'] == true){
              let name = data['name'];
              $('#res').html(name);
            }
        },
        error: function (error) {
            console.log('cant upload')
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });
};

Upload.prototype.progressHandling = function (event) {
    var percent = 0;
    var position = event.loaded || event.position;
    var total = event.total;
    if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100);
    }
    // update progressbars classes so it fits your code
    //$(progress_bar_id + " .progress-bar").css("width", +percent + "%");
    $(".status").text(percent + "%");
};