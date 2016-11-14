var $ = jQuery.noConflict();

$(document).ready(function(){
	width=screen.width; // ширина  
    height=screen.height; // высота
    if (width==1280 && height==1024){
    	$('head').append('<link href="/_s_/css/term-main-size-1280-1024.css" rel="stylesheet" type="text/css" />')
    }
    if (width==1024 && height==768){
    	$('head').append('<link href="/_s_/css/term-main-size-1024-768.css" rel="stylesheet" type="text/css" />')
    }
})
	