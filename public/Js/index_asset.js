// animation
var startButton = document.querySelector("#middle_path");
var startButton2 = document.querySelector("#middle_path2");
var tween = KUTE.fromTo(
	'#middle_path',
	 {path: '#middle_path' }, 
	 { path: '#middle_path2' },
	{repeat:999,duration:2000,yoyo:true}
	 ).start();

$("#profile_container").css({'visibility':'hidden'});
$('#profile_container').ready(()=>{
$("#profile_container").css({'visibility':'visible'});
})

//comment

var comments =  document.getElementsByClassName("comment_list")

// slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("comment_list");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
  dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

// '''''

$('#commentForm').on('submit',(e)=>{
  e.preventDefault();
  data = {
    name: $('#nameOf').val(),
    email: $('#emailOf').val(),
    message: $('#textOf').val()
  }
  console.log(data);
  $.ajax({
    url: 'https://mysterpmf.me/message',
    data: data,
    method: 'POST',
    success: (response)=>{
      console.log(response)
      $('#success').text('Thank you. Pmf will reply you in your email.');
      $('#success').css({'color':'green',
        'margin-bottom': '20px'
      });
      $('#nameOf').val('');
      $('#emailOf').val('');
      $('#textOf').val('');
    }
  })
})