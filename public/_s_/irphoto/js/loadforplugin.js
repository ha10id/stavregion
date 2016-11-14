$(document).ready(function() {
	var imgList = $('ul#img-list');
	var gall_id = $('#id_gallery_id').attr('value');
	var gall_name = $('#id_name').attr('value');
	imgList.load('/irphoto/ajax_get_images/',{gall_id: gall_id});
	
	$('input[type="submit"]').click(function() {
        var gall = $('#id_gallery_id');
    	var gall_name = $('#id_name').attr('value');
        $.post('/irphoto/ajax_get_gallery/',{get_gall: true, gall_name:gall_name}, function(data) {
        	var opt = $('<option/>').appendTo(gall);
        	opt.attr('value', data);
        	opt.attr('selected', "selected");
        });
        imgList.find('li').each(function() {
        	var li = this;
        	var img_desc = $($(li).find(".description")).find("input").attr("value");
        	var img_id = $(li).find(".img").attr("alt");
        	if (img_desc != $(li).find(".img").attr("title")) {
    			$.post('/irphoto/ajax_add_desc/', {img_id: img_id, img_desc: img_desc}, function(){});	
        	}
        });
        
     	send_order(imgList.find('li'));   
        
        $(document).ajaxStop(function(){
        	$("#cmsgallery_form").submit();
        });
    	return false
    });
    
    function send_order(li) {
    	var order = "";
    	var ul = li.parent('ul');
    	var gall_name = $('#id_name').attr('value');
    	ul.find('li').each(function() {
    		order += $(this).attr('id') + ",";
    	});
    	$.post('/irphoto/ajax_sorting/',{gall_sort: order, gall_name:gall_name}, function() {});
    	return true
    }
});