let cross = document.getElementById('cross');
let menu = document.getElementById('menu1');
let header2 = document.getElementById('header2');

cross.addEventListener('click',()=>{
header2.style.marginLeft = "-80%";
})

menu.addEventListener('click',()=>{
	header2.style.marginLeft = "0";
})