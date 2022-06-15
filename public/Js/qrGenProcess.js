  var output = document.getElementById('output');
function min(){
  output.style.display='none';
}

// jquery
$('#preLoader').hide();
$('#res').css({'display':'none'});

$('#text').focus(()=>{
  $('#generate').css({'background':'#1f6c8b'});
});
$("#string").addClass("active");
$(".ctg").click(function(){
  $(".ctg").removeClass("active");
  $(this).addClass("active");
  let txt = 'Enter ' + $(this).html();
  $('#text').attr('placeholder',txt);
});

// advance setting

let h = $('#option').height()
//$('#option').hide();
$('#option').height(0);

$("#checkbox").click(()=>{
  if ($('#checkbox').prop('checked')){
    //$('#option').show();
    $('#option').height(h);
  }else{
    $('#option').height(0);
  }
})

//generate
  $('#in_con').on('submit', function (event) {
    event.preventDefault(); // Stop the form from causing a page refresh.
    // Getting the height of the document
      $("#file").val('')
      $('.status').text('')
    if ($('#res').html() == ''){
      var name = false;
      console.log(" name false")
    }else{
      var name = $('#res').html()
      console.log(" name is" + name)
    }
    console.log("outside name is " + name)
    var n = $(document).height();
    $('html, body').animate({ scrollTop: n }, 50);
    var colorx = document.getElementById('colourPicker').value;
    let result = $('#output').css('display');
    if (result == 'block') {
      $('#output').css({'display':'none'});
    }
    $('#generate').css({'background':'#213259'});
    $('#preLoader').show();
    var data = {
      text: $('#text').val(),
      color: colorx,
      location : name
    };
      console.log(data);
    $.ajax({
      url: 'http://88.99.83.158:5000/qrCodeGenerator/process',
      data: data,
      method: 'POST'
    }).then(function (response) {
      $('#qr').attr('src',response);
      $('#output').css({'display':'block'});
      $('#text').val("");
      $('#preLoader').hide()


 document.getElementById('download').addEventListener("click",DownloadFile(response));
     // $('body').append(response);
     
    }).catch(function (err) {
      console.error(err);
    });
  });

//download function

function DownloadFile(fileName) {
            //Set the File URL.
      var url = fileName;

      $.ajax({
          url: url,
          cache: false,
          xhr: function () {
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function () {
                  if (xhr.readyState == 2) {
                      if (xhr.status == 200) {
                          xhr.responseType = "blob";
                      } else {
                          xhr.responseType = "text";
                      }
                  }
              };
              return xhr;
          },
          success: function (data) {
              //Convert the Byte Data to BLOB object.
              var blob = new Blob([data], { type: "application/octetstream" });

              //Check the Browser type and download the File.
              var isIE = false || !!document.documentMode;
              if (isIE) {
                  window.navigator.msSaveBlob(blob, fileName);
              } else {
                  var url = window.URL || window.webkitURL;
                  link = url.createObjectURL(blob);
                  var a = $("<a />");
                  a.attr("download", fileName);
                  a.attr("href", link);
                  $("body").append(a);
                  //download
                  $('#download').click(()=>{
                  a[0].click();
                  });
                  $("body").remove(a);
              }
          }
      });
  };