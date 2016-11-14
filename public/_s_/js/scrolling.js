var jQ = jQuery.noConflict();
jQ(document).ready(function(){
  jQ("#content-slider").slider({
    animate: true,
    change: handleSliderChange,
    slide: handleSliderSlide,
  	orientation: 'vertical',
  	value: 100
  });
  
  
  jQ("a.scroll-up").css("display", "none");
  var bottom = jQ(".ui-slider-handle");
  var k = parseInt(jQ("#content-slider").css("height"))/100;
  var intBottom = parseInt(bottom.css("bottom"))/k;
  var delta = jQ(".b-scrollarea").height() * 100 / jQ(".b-scrollarea").attr("scrollHeight") - 1;
  var Break = false;
  var clicking = false;
  var MouseSatrt = 0;
  
  
  
  jQ(".b-scroll").click(function(){
  	if(!Break){
  	jQ("a.scroll-up").css("display", "none"); 
  	bottom.css("bottom", "100%");
  	var intBottom = parseInt(bottom.css("bottom"))/k;
  	var maxScroll = jQ(".b-scrollarea").attr("scrollHeight") - jQ(".b-scrollarea").height();
  	jQ(".b-scrollarea").animate({scrollTop: (100 - intBottom) * (maxScroll / 100) }, 1000);
  	} else { Break=false; }
  });
  
  jQ("a.scroll-up").click(function(){
	var intBottom = parseInt(bottom.css("bottom"))/k;
  	if (intBottom != 100){
  		//alert(jQ(".ui-slider-handle").css("bottom"));
  		jQ("a.scroll-down").css("display", "");
  		if((intBottom+delta) >= 100){ jQ(this).css("display", "none"); bottom.css("bottom", "100%");} else { bottom.css("bottom", (intBottom+delta) + "%"); }
  		var maxScroll = jQ(".b-scrollarea").attr("scrollHeight") - jQ(".b-scrollarea").height();
  		jQ(".b-scrollarea").animate({scrollTop: (100 - (intBottom + delta)) * (maxScroll / 100) }, 1000);
  	}
  	else {
  		jQ(this).css("display", "none");
  	}
  	Break = true;
  	return false;
  });
  jQ("a.scroll-down").click(function(){
  	var intBottom = parseInt(bottom.css("bottom"))/k;
  	if (intBottom != 0){
  		//alert(jQ(".ui-slider-handle").css("bottom"));
  		jQ("a.scroll-up").css("display", "");
  		if((intBottom-delta) <= 0){ jQ(this).css("display", "none"); bottom.css("bottom", "0%"); } else { bottom.css("bottom", (intBottom-delta) + "%"); }
  		var maxScroll = jQ(".b-scrollarea").attr("scrollHeight") - jQ(".b-scrollarea").height();
  		jQ(".b-scrollarea").animate({scrollTop: (100 - (intBottom - delta)) * (maxScroll / 100) }, 1000);
  	}
  	else {
  		jQ(this).css("display", "none");
  	}
  	Break = true;
  	return false;
  });
});

function handleSliderChange(e, ui)
{
  var maxScroll = jQ(".b-scrollarea").attr("scrollHeight") - jQ(".b-scrollarea").height();
  jQ(".b-scrollarea").animate({scrollTop: (100 - ui.value) * (maxScroll / 100) }, 1000);
  jQ("a.scroll-up").css("display", ""); jQ("a.scroll-down").css("display", "");
  if(ui.value == 100){jQ("a.scroll-up").css("display", "none");} else if(ui.value == 0){jQ("a.scroll-down").css("display", "none");}
}

function handleSliderSlide(e, ui)
{
  var maxScroll = jQ(".b-scrollarea").attr("scrollHeight") - jQ(".b-scrollarea").height();
  jQ(".b-scrollarea").attr({scrollTop: (100 - ui.value) * (maxScroll / 100) });
  jQ("a.scroll-up").css("display", ""); jQ("a.scroll-down").css("display", "");
  if(ui.value == 100){jQ("a.scroll-up").css("display", "none");} else if(ui.value == 0){jQ("a.scroll-down").css("display", "none");}
}
