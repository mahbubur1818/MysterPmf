// console.log("got generator process");
// let generate = document.getElementById('generate');
// let input = document.getElementById('text');
// let url_btn = document.getElementById('text');
// let text_btn = document.getElementById('string');

// var qr = document.getElementById('qr');

function min(){
  var output = document.getElementById('output');
  output.style.display='none';
}
//generate.addEventListener("click",spaw());

// jquery

  $('#in_con').on('submit', function (event) {
    event.preventDefault(); // Stop the form from causing a page refresh.
    var data = {
      text: $('#text').val(),
    };
      console.log('jquery input is: '+ data);
    $.ajax({
      url: 'http://localhost:5000/qrCodeGenerator/process',
      data: data,
      method: 'POST'
    }).then(function (response) {
      // Do stuff with the response, like add it to the page dynamically.
     // $('body').append(response);
     console.log('jquery response is:'+response);
    }).catch(function (err) {
      console.error(err);
    });
  });

