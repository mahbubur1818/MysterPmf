// animation
var startButton = document.querySelector("#middle_path");
var startButton2 = document.querySelector("#middle_path2");
var tween = KUTE.fromTo(
	'#middle_path',
	 {path: '#middle_path' }, 
	 { path: '#middle_path2' },
	{repeat:999,duration:2000,yoyo:true}
	 ).start();