var jQ = jQuery.noConflict();

function linkFalse() {
	alert("Извините, переход по данной ссылке на терминальной версии портала невозможен.", "Предупреждение");
	return false;
}

jQ(document).ready(function(){
	var ValidList = ['news',
					 'region',
					 'govdep',
					 'feedback',
					 'korrupciej',
					 'programms',
					 'termhelp',
					 'termabout'
					// '_'
					];
	var siteURL = location.host.toString();
	
	function validLink(){
		jQ("a:not([href^='/'], [href^='#'], [href^=' '], [href=''], [href^='http://"+siteURL+"'], [href^='http://www."+siteURL+"'])").each(function(){
			var href = jQ(this).attr("href");
			if (!href.indexOf("http://stavregion.ru")){
				jQ(this).attr("href", href.substring("http://stavregion.ru".length));
			} else 
			if(!href.indexOf("http://www.stavregion.ru")){
				jQ(this).attr("href", href.substring("http://www.stavregion.ru".length));
			} 
			else {
				var reg = /^\bhttp\b/;
				if(reg.test(href)){
				jQ(this).attr("href", "#");
				jQ(this).attr("onclick", "linkFalse();");
				jQ(this).click(function(){linkFalse()});
				}
			}
		});
		
		jQ("a[href^='/']").each(function(){
			var href = jQ(this).attr("href");
			if (href.length > 1){
				if(!(jQ.inArray(href.substring(1, href.indexOf('/',1)), ValidList) > -1))
				{
					if(!(jQ(this).attr("rel").indexOf("prettyPhoto") > -1)){
						jQ(this).attr("href", "#");
						jQ(this).attr("onclick", "linkFalse();");
						jQ(this).click(function(){linkFalse()});
					}
				} 
			}
			//patern=/\..{2,4}$/
			//if (patern.test(href)) 
				//if(patern.exec(href) != '.jpg');
		});
	}
	validLink();
});