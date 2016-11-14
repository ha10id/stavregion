$(document).ready(function() {

    // Консоль
    var console = $("#gallery_block");

    // Инфа о выбранных файлах
    var countInfo = $("#info-count");
    var sizeInfo = $("#info-size");

    // Стандарный input для файлов
    var fileInput = $('#file-field');
    
    // ul-список, содержащий миниатюрки выбранных файлов
    var imgList = $('ul#img-list');
    
    // Контейнер, куда можно помещать файлы методом drag and drop
    var dropBox = $('#img-container');

    // Счетчик всех выбранных файлов и их размера
    var imgCount = 0;
    var imgSize = 0;
    
	var gall_name = $('#id_name').attr('value');
	if (!($('#id_name').attr('value'))) {
		var dt = new Date();
		var date = dt.getDate() + "." + (dt.getMonth()+1) + "." + dt.getFullYear();
		$.post('/irphoto/ajax_gallery_check/', {gall_name: date}, function(data){ 
			$('#id_name').attr('value',data);
			gall_name = $('#id_name').attr('value');
			});
	}
    $('#id_name').change(function(gall_name) {
    	gall_name = $('#id_name').attr('value');
	});
	
    var uploads = $('#uploads');
    
    ////////////////////////////////////////////////////////////////////////////


    // Вывод в консоль
    function log(str) {
        $('<p/>').html(str).prependTo(console);
    }

    // Вывод инфы о выбранных
    function updateInfo() {
        countInfo.text( (imgCount == 0) ? 'Изображений не выбрано' : ('Изображений выбрано: '+imgCount));
        sizeInfo.text(Math.round(imgSize / 1024));
    }

    // Обновление progress bar'а
    function updateProgress(bar, value) {
        var width = bar.width();
        var bgrValue = -width + (value * (width / 100));
        bar.attr('rel', value).css('background-position', bgrValue+'px center').text(value+'%');
    }



	function uploadFile(li) {
            var uploadItem = li;
            var pBar = $(uploadItem).find('.progress');
            //log('Начинаем загрузку `'+uploadItem[0].file.name+'`...');
            new uploaderObject({
                file:       uploadItem[0].file,
                url:        '/irphoto/upload/',
                fieldName:  'image',
                gall_name: $('#id_name').attr('value'),

                onprogress: function(percents) {
                    updateProgress(pBar, percents);
                },
                
                oncomplete: function(done, data) {
                    if(done) {
                        updateProgress(pBar, 100);
                        pBar.remove();
                        //log('Файл `'+uploadItem[0].file.name+'` загружен, полученные данные:<br/>*****<br/>'+data+'<br/>*****');
                    } else {
                        //log('Ошибка при загрузке файла `'+uploadItem[0].file.name+'`:<br/>'+this.lastError.text);
                    }
                },
                onsuccesful: function() {
                	if(this.successful) {
                		//var ul = $(uploadItem[0]).parent("ul");
                		$(uploadItem[0]).replaceWith(this.successful);
                	}
                }
            });
	}

    // Отображение выбраных файлов и создание миниатюр
    function displayFiles(files) {
        var imageType = /image.*/;
        var num = 0;
        
        $.each(files, function(i, file) {
            
            // Отсеиваем не картинки
            if (!file.type.match(imageType)) {
                //log('Файл отсеян: `'+file.name+'` (тип '+file.type+')');
                return true;
            }
            
            num++;
            
            // Создаем элемент li и помещаем в него название, миниатюру и progress bar,
            // а также создаем ему свойство file, куда помещаем объект File (при загрузке понадобится)
            var li = $('<li/>').attr("style","height: 200px; width: 200px; text-align: center;").appendTo(imgList);
            //$('<div/>').text(file.name).appendTo(li);
            var img = $('<img/>').attr("style","vertical-align: middle;").appendTo(li);
            $('<div/>').addClass('progress').attr('rel', '0').text('0%').appendTo(li);
            li.get(0).file = file;

            // Создаем объект FileReader и по завершении чтения файла, отображаем миниатюру и обновляем
            // инфу обо всех файлах
            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.attr('src', e.target.result);
                    aImg.attr('width', 150);
                    log('Картинка добавлена: `'+file.name + '` (' +Math.round(file.size / 1024) + ' Кб)');
                    imgCount++;
                    imgSize += file.size;
                    updateInfo();
                };
            })(img);
            
            img.attr("src", '/_s_/irphoto/i/loader.gif');
            //reader.readAsDataURL(file);
            
            uploadFile(li);
        });
    }
    
    
    ////////////////////////////////////////////////////////////////////////////


    // Обработка события выбора файлов через стандартный input
    // (при вызове обработчика в свойстве files элемента input содержится объект FileList,
    //  содержащий выбранные файлы)
    fileInput.bind({
        change: function() {
            //log(this.files.length+" файл(ов) выбрано через поле выбора");
            displayFiles(this.files);
        }
    });
          

    // Обработка событий drag and drop при перетаскивании файлов на элемент dropBox
    // (когда файлы бросят на принимающий элемент событию drop передается объект Event,
    //  который содержит информацию о файлах в свойстве dataTransfer.files. В jQuery "оригинал"
    //  объекта-события передается в св-ве originalEvent)
    dropBox.bind({
        dragenter: function() {
            $(this).addClass('highlighted');
            return false;
        },
        dragover: function() {
            return false;
        },
        dragleave: function() {
            $(this).removeClass('highlighted');
            return false;
        },
        drop: function(e) {
            var dt = e.originalEvent.dataTransfer;
            //log(dt.files.length+" файл(ов) выбрано через drag'n'drop");
            displayFiles(dt.files);
            $(this).removeClass('highlighted');
            return false;
        }
    });


    // Обаботка события нажатия на кнопку "Загрузить". Проходим по всем миниатюрам из списка,
    // читаем у каждой свойство file (добавленное при создании) и начинаем загрузку, создавая
    // экземпляры объекта uploaderObject. По мере загрузки, обновляем показания progress bar,
    // через обработчик onprogress, по завершении выводим информацию

    $("#upload-all").click(function() {
        
        imgList.find('li').each(function() {

            var uploadItem = this;
            var pBar = $(uploadItem).find('.progress');
            log('Начинаем загрузку `'+uploadItem.file.name+'`...');
            new uploaderObject({
                file:       uploadItem.file,
                url:        '/irphoto/upload/',
                fieldName:  'image',
                gall_name: gall_name,

                onprogress: function(percents) {
                    updateProgress(pBar, percents);
                },
                
                oncomplete: function(done, data) {
                    if(done) {
                        updateProgress(pBar, 100);
                        log('Файл `'+uploadItem.file.name+'` загружен, полученные данные:<br/>*****<br/>'+data+'<br/>*****');
                    } else {
                        log('Ошибка при загрузке файла `'+uploadItem.file.name+'`:<br/>'+this.lastError.text);
                    }
                }
            });
        });
    });
    
    
    
    $(".default").live('click', function() {
        imgList.find('li').each(function() {
        	var li = this;
        	var img_desc = $($(li).find(".description")).find("input").attr("value");
        	var img_id = $(li).find(".img").attr("alt");
        	if (img_desc != $(li).find(".img").attr("title")) {
    			$.post('/irphoto/ajax_add_desc/', {img_id: img_id, img_desc: img_desc}, function(){});	
        	}
        });
        if (gall_name != $('#id_name').attr('value')){
        	$.post('/irphoto/ajax_gallery_rename/', {gall_name: gall_name, gall_new_name: $('#id_name').attr('value')}, function(){
        	});
        }
        
        send_order(imgList.find('li'));
        
        $(document).ajaxComplete(function(){
        	$("#gallery_form").submit();
        });
    	return false;
    });

    
    // Проверка поддержки File API в браузере
    if(window.FileReader == null) {
        log('Ваш браузер не поддерживает File API!');
    }
    
    //Расстановка фото
    
    $("#img-list").sortable({
	  	placeholder: "ui-state-highlight",
	  	opacity: 0.6,
	  	stop: function(event, ui) {
	  		var order = "";
	  		var ul=$("#img-list");
    		ul.find('li').each(function() {
    		order += $(this).attr('id') + ",";
    		});
    	$.post('/irphoto/ajax_sorting/',{gall_sort: order, gall_name:gall_name}, function() {});
	  	}
  	});
  
    function send_order(li) {
    	var order = "";
    	var ul = li.parent('ul');
    	ul.find('li').each(function() {
    		order += $(this).attr('id') + ",";
    	});
    	$.post('/irphoto/ajax_sorting/',{gall_sort: order, gall_name:gall_name}, function() {});
    	return true
    }
    $(".up").live("click", function(){
        var pdiv = $(this).parent('div').parent('li');
        pdiv.insertBefore(pdiv.prev());
        send_order(pdiv);
        return false
    });
    $(".down").live("click", function(){
        var pdiv = $(this).parent('div').parent('li');
        pdiv.insertAfter(pdiv.next());
        send_order(pdiv);
        return false
    });
    
    $(".rotate_270, .rotate_90").live("click", function(){
    	var img = $(this).parent('div').parent('li').find('.img');
    	img.attr('src','/_s_/irphoto/i/loader.gif');
    	var img_id = img.attr('alt');
    	var rotate = $(this).attr('class');
    	$.post('/irphoto/ajax_rotate_image/',{img_id:img_id, img_rotate:rotate}, function(data){
    		if (data != 'fail') {
    			img.attr("src", data + "?timestamp=" + new Date().getTime());
    		}
    	});
    	return false
    });
    
    $(".delete").live("click", function(){
    	if (confirm("Удалить изображение?")) {
	    	var li = $(this).parent('div').parent('li');
	    	var img = $(this).parent('div').parent('li').find('.img');
	    	var img_id = img.attr('alt');
	    	var csrf = $("body").find("input[name=csrfmiddlewaretoken]").val();
	    	$.post("/admin/irphoto/image/"+img_id+"/delete/", {csrfmiddlewaretoken: csrf, post: "yes"}, function(){
	    		$(li).remove();
	    		send_order(li);
	    	});
	    }
	    else { return false }
    });
    $(".description input").live('change focusout', function() {
    	var li = $(this).parent('div').parent('li');
    	var img_desc = this.value;
    	var img_id = li.find(".img").attr("alt");
    	if (img_desc != li.find(".img").attr("title")) {
			$.post('/irphoto/ajax_add_desc/', {img_id: img_id, img_desc: img_desc}, function(){});	
    		li.find(".img").attr("title", img_desc)
    	}
    	return false
    });  
	window.onkeydown = function(e) {  
	     e = e || window.event;
	     if (e.keyCode == 27) {
	     	try{
		     	//$(document).find('body').find('.divCrop').remove();
		     	$(window.parent.document).find('body').find('.divCrop').remove();
		     	$(window.document).find('body').find('.divCrop').remove();
	     	}
	     	catch (e) {
	     		alert(window.document.location);
	     	}
	     }  
	     return true;  
  }
});