function get_child(id) {
	//alert('get_ch '+id)
    if($('#'+id+':has("ul")').length==0 && id!=undefined){
        ajax_get_child(id)
    }
};

function ajax_get_child(id){
	$('#'+id).removeClass('closed').addClass('load')
	$.ajax({ url: '/ircms/haschild/'+id+'/',
        dataType: 'json',
        type: 'GET',
        success: function(data){
        	for(page_id in data){
        		$('#'+page_id).removeClass('load')
        		//alert($('#'+page_id+':has("ul")').length)
        		if($('#'+page_id+':has("ul")').length==0){
	        		//alert(eval('data.'+page_id+'.html'))
	        		$('#'+page_id).append(eval('data.'+page_id+'.html'))
	        		$('#'+page_id).find('li:last').addClass('last')
	        		$('#'+page_id).not('.open').removeClass('closed').addClass('open')
	        		for (child in eval('data.'+page_id+'.has_child')){
	        			if(eval('data.'+page_id+'.has_child.'+child)==false){
	        				$('#'+child).not('.open').not('.closed').removeClass('leaf').addClass('closed');
	        			}
	        		}
        		}
        	}
        },
    })
}

function get_opened(pages, page_id){
	if (eval('pages.'+page_id)!=undefined){
		$('#'+page_id).not('.open').not('ul').append(eval('pages.'+page_id+'.html'))
		//alert('get_op '+page_id)
		$('#'+page_id).find('li:last').addClass('last')
		$('#'+page_id).not('.open').removeClass('closed').removeClass('leaf').addClass('open')
		for(page in eval('pages.'+page_id+'.is_leaf')){
			if(eval('pages.'+page_id+'.is_leaf.'+page)==false){
				$('#'+page).not('.closed').not('.open').removeClass('leaf').addClass('closed')
				get_opened(pages, page)
			}
			else{
				$('#'+page).not('.closed').not('.open').not('leaf').addClass('leaf')
			}
		}
	}
}

function get_first(){
	var page_list = jQuery.cookie('undefined_open')
	if(page_list==null){
		page_list=''
	}
	$.ajax({ url: '/ircms/haschild_0/'+page_list+'/',
        dataType: 'json',
        type: 'GET',
        async: false,
        //complete: alert('comlete'),
        success: function(result) {
        	
        	var query_search = [false, false]
        	var regexp = /\?q=(.*)/
        	query_search = regexp.exec(location)
        	
        	if(query_search==null || query_search[1].length==0){
        		for(page_id in result.first_level){
                    if(eval('result.first_level.'+page_id).is_leaf==false){
                        if(eval('result.opened.'+page_id)!=undefined){
                        	get_opened(result.opened, page_id)
                        }
						$('#'+page_id).not('.open').not('.closed').removeClass('leaf').addClass('closed');
					}
                }
        	}
        }, 
    })
}

function slice_title(){
	min_w_col1 = 1600
	$('div.cont').each(function(){
		w_cont = $(this).width()
		w_col2 = $(this).find('.col2').width()
		w_col1 = (w_cont - w_col2)-(w_cont - w_col2)%2-1
		if(min_w_col1>w_col1 && w_col1!=0){min_w_col1 = w_col1}
	
//	$('div.cont').each(function(){
//		w_cont = $(this).width()
//		w_col2 = $(this).find('.col2').width()
//		w_col1 = w_cont - w_col2
//		$(this).find('.col1').width(w_col1-50)
//		$(this).append($(this).find('.col1').width())
//		
	});
	$('.col1').each(function(){
		$(this).width(min_w_col1)
//		$(this).append(min_w_col1)
	})
}