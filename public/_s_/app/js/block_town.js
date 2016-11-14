$(document).ready(function(){	
	links = {"essentykskyaya": "/region/municipal/rayons/predgornmr/",
			   "min-vodi": "/region/municipal/rayons/minmr/",
			   "georgievsk": "/region/municipal/rayons/gmr/",
			   "novopavlovsk": "/region/municipal/rayons/kmr/",
			   "zelenokymsk": "/region/municipal/rayons/sovetmr/",
			   "kyrskaya": "/region/municipal/rayons/kursmr/",
			   "stepnoe": "/region/municipal/rayons/stepmr/",
			   "neftekymsk": "/region/municipal/rayons/neftmr/",
			   "levokymskoe": "/region/municipal/rayons/levmr/",
			   "bydenovsk": "/region/municipal/rayons/budmr/",
			   "aleksandrovskoe": "/region/municipal/rayons/almr/",
			   "novoselickoe": "/region/municipal/rayons/novoselmr/",
			   "blagodarnii": "/region/municipal/rayons/blmr/",
			   "azgir": "/region/municipal/rayons/arzmr/",
			   "letnyaya-stavka": "/region/municipal/rayons/turkmenmr/",
			   "svetlograd": "/region/municipal/rayons/petrovmr/",
			   "kyrsavka": "/region/municipal/rayons/andrmr/",
			   "kochybeevskoe": "/region/municipal/rayons/koch/",
			   "mihailovsk": "/region/municipal/rayons/shpakmr/",
			   "grachevka": "/region/municipal/rayons/grmr/",
			   "donskoe": "/region/municipal/rayons/trunovmr/",
			   "izob": "/region/municipal/rayons/imr/",
			   "novoaleks": "/region/municipal/rayons/novmr/", 
			   "divnoe": "/region/municipal/rayons/apmr/",
			   "ipatovo": "/region/municipal/rayons/ipmr/",
			   "krasn": "/region/municipal/rayons/krasnmr/"
	  }
	
	$(function() {
		testover = $('.main-img').maphilight({ 	
			fill: true,
			fillColor: 'ffffff',
			fillOpacity: 0.55,
			stroke: true,
			strokeColor: '565e71',
			strokeOpacity: 1,
			strokeWidth: 2,
			fade: true,
			alwaysOn: false,
			neverOn: false,
			groupBy: false,
			wrapClass: false,
			shadow: true,
			shadowX: 1,
			shadowY: 2,
			shadowRadius: 7,
			shadowColor: '475063',
			shadowOpacity: 0.33,
			shadowPosition: 'outside',
			shadowFrom: false});
	})
 
	  function area_over(id_area){
		  $('.town_block').hide();
		  $('#'+id_area+'-block').show();
	  }
	  
	  $('map').mouseout(function(event){
		  element_over = event.toElement || event.relatedTarget || '';
		  if (element_over.className=='town_dot' || element_over.className=='town' || element_over.className=='raion'){
			  return 0;
		  }
		  else{
			  $(document).find('[name=highlighted]').remove();
			  $('.town_block').hide();
		  }
	  });
      
	  $('.town_block').mouseout(function(event){
		  block_out = event.toElement || event.relatedTarget;
		  if(block_out.nodeName.toLowerCase()=="map"){
			  return 0;
		  }
		  else{
			  $('.town_block').hide();
			  $(document).find('[name=highlighted]').remove();
		  }
	  });
	  
	  $('area').click(function(){
		  term = $(document).find('#interective_map')
		  if(term.length){
			  if($(this).hasClass('has_href')){
			      href = links[id]
			      $(this).attr('href', href)
			  }
			  else{
				  $('area').removeClass('has_href')
				  $('area').removeAttr('has_href')
				  $(this).addClass('has_href')
			  }
		  }
	  })
	  
	  $('area').mouseover(function() {
		  term = $(document).find('#interective_map')
		  $(this).css('cursor', 'pointer')
		  id = $(this).attr('id')
		  $('.town_block').hide();
		  $('#'+id+'-block').show();
		  if(!term.length){
			  href = links[id]
		      $(this).attr('href', href)
		  }
	  });
	  
});