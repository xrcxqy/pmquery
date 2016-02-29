window.onload = function(){
 	window.onscroll = function () {
		var scrollTop =document.body.scrollTop;
		var clientHeight = document.body.clientHeight;
	    var back = document.getElementById("floatDiv");
	    back.style.top = scrollTop + clientHeight/2;
	};
	window.onresize = window.onscroll;
	window.onscroll();
}

var scrollHander ;
function goTop(){
	scrollHander.body.scrollTo('top',0);
}

function goBottom(){
	scrollHander.body.scroll('bottom',Infinity);
}