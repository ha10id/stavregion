
	// if (!(location.hash)) {
		// window.open(location.href+"#true", "", "width=1024,height=768");
		// $(window.parent.document).find(".plugin-editor").html("<p>Ни один плагин не выбран. Выберите один из перечисленных слева.</p>");
		// $(window.parent.document).find("iframe").remove();
	// }
$(document).ready(function() {
	function loadCrop(img_id){
		var body = $(window.parent.document).find("body");
		var divImg = $("<div/>").addClass('divCrop').appendTo(body);
		var divCont = $("<iframe/>").addClass('divCont').attr("name", 'divCont').attr("frameborder", "0").appendTo(divImg);
		
		var form = $("<form style='display: none;'</form>").attr("action", "/irphoto/ajax_get_images_crop/").attr("method", "POST").attr("target", "divCont").attr("align", "center").appendTo(divImg);
	 	$("<input/>").val(img_id).attr("name", "img_id").appendTo(form);
	 	$("<input/>").val("true").attr("name", "gall").appendTo(form);
	 	form.submit();
	 	divCont.load(function(){
		 		var ileft = (window.parent.innerWidth - $(this).width())/2;
				divCont.css({left: ileft});
				if(navigator.userAgent.indexOf("Firefox/")+1){
					var itop = (window.parent.innerHeight - $(this).height())/2 + $(window.parent).scrollTop();
					divCont.css({top: itop});
				}
	 	});
			$('<input></input>').attr('type','button').attr('value','Закрыть').attr("id", "exit-crop").click(function(){body.find('.divCrop').remove();}).appendTo(divImg);
			$('<br/><br/><p style="color: white;">Для выхода нажмите "Закрыть"</p>').appendTo(divImg);
			$('.slide').hide();
	}
	 $(".crop").live("click", function () {
	 	var img_id = $(this).parent('div').parent('li').find('img').attr('alt');
	 	loadCrop(img_id);
		return false
	});
});

	function goback(){
    //location.href="..";
    jQuery("#endcrop").show();
	}
	function cropimage(imgId)
	{
	    var x1 = $('#x1').attr('value');   
	    var x2 = $( '#x2' ).attr('value');
	    var y1 = $( '#y1' ).attr('value');
	    var y2 = $( '#y2' ).attr('value');
	    var width = $( '#width' ).attr('value');  
	    var height = $( '#height' ).attr('value');
	    var img_url =  $( '#target' ).attr('alt');          
	    jQuery.post("/irphoto/crop/", {x1: x1,  x2: x2,  y1: y1,  y2: y2, width: width, height: height, img_url: img_url }, function(data)
	    {
		    $('#id_crop').val(data);
		    var img = $("#img-list").find("#"+imgId).find(".img");
		    img.attr("src", img.attr("src") + "?timestamp=" + new Date().getTime());
		     //jQuery("#cropdone").show();
		     //jQuery("#cropdone").slideToggle("slow");
		     jQuery("#slowpanel").slideToggle("slow");
		     setTimeout('goback()',1000);
		     $('body').find('.divCrop').remove();
	     
	     });
	    
	}
	function slowImage(){
	        jQuery("#slowpanel").slideToggle("slow");
	        jQuery(this).toggleClass("active"); return false;
	}