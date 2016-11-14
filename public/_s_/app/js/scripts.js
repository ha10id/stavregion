$(function(){

	fixedAside();

	$('select,input').styler({
		onFormStyled: function(){
			
		}
		
	});

	$('#ai_town').styler('destroy');
	$('#ai_district').styler('destroy');

	$('.owl-sources').owlCarousel({
	    loop:true,
	    margin:30,
	    dots: false,
	    responsiveClass:true,
	    autoplay: true,
	    responsive:{
	        0:{
	            items:2,
	            nav:true,
	            loop:false
	        },
	        768:{
	            items:3,
	            nav:true,
	            loop:false
	        },
	        1200:{
	            items:4,
	            nav:true,
	            loop:false
	        }
	    }
	})

	//4 или 3 колонки в зависимости от ширины окна
	if ($('section.news').length > 0) {
		var news = $('.news__one')
		news.each(function(i){
			if ((i+1) % 3 == 0){
				$(this).after('<div class="clearfix visible-lg"></div>');
			}
			if ((i+1) % 4 == 0){
				$(this).after('<div class="clearfix visible-ws"></div>');
			}
		})
	}

	/* фиксируем боковое меню на разрешениях от 992 */
	function fixedAside(){
		// var browser_h = $(window).height();
		var aside_bottom = $('aside').height();
		var scrollTop = $(window).scrollTop();
		var browser_h = $(window).height();
		if ((browser_h + scrollTop > aside_bottom) && ($(window).width()>1200) && ($(window).width()<1600)){
			$('aside').addClass('asideFixed');
			$('.right_content').addClass('asideFixed__right_content')
		} else {
			$('aside').removeClass('asideFixed');
			$('.right_content').removeClass('asideFixed__right_content')
		}

		if ((browser_h + scrollTop > aside_bottom) && (($(window).width()<1200) && ($(window).width()>992))){
			$('aside').addClass('asideFixed_md');
			$('.right_content').addClass('col-md-offset-3')
		} else {
			$('aside').removeClass('asideFixed_md');
			$('.right_content').removeClass('col-md-offset-3')
		}

		if ((browser_h + scrollTop > aside_bottom) && ($(window).width()>=1580)){
			$('aside').addClass('asideFixed_lg')
			$('.right_content').addClass('asideFixed__right_content_lg ')
		} else {
			$('aside').removeClass('asideFixed_lg')
			$('.right_content').removeClass('asideFixed__right_content_lg ')
		}
	}

	$('.menu-open_li_dropdown').click(function(){
		$(this).children('.menu-open_dropdown_menu').slideToggle();
	})

	$(document).scroll(function(){
		fixedAside();
	})
	$(window).resize(function(){
		fixedAside();
	})
});

