$(document).ready(function(){

	$('a.edit_image').click(function(){
		var img_name = $('#img_path').val();
		crop = window.open('/imaging/crop_window/?image='+ img_name, "none", " width=1200, height=800, resizable=0","replace=yes");
		if (crop.opener == null) crop.opener = self;
		//$( crop.window ).unload( function () { alert("Bye now!"); } );
		//crop.close();
		return false;
	});
});

function test(){
	return 1111;
}