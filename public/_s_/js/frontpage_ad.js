

var ad_divs = getElementsByAttribute('div', 'class','b-act');
var ad_links = getElementsByAttribute('li', 'class','actli');
var rotate_banners = true;
var rotate_timeout = 9000; // in milliseconds
var prev_banner = ad_divs.length -1;
var next_banner = 1;

function getElementsByAttribute(tag,attr,val,container)
{
container = container||document
var all = container.all||container.getElementsByTagName(tag)
var arr = []
for(var k=0;k<all.length;k++)
if(all[k].getAttribute(attr) == val)
arr[arr.length] = all[k]
return arr
}


function activateAd(id){
	activateAdText(id);
	activateAdLink(id);
	if (id <= 0){
		prev_banner = ad_divs.length -1;
	}else{
		prev_banner = id-1;
	}
	
	if (id >= ad_divs.length -1){
		next_banner = 0;
	}else{
		next_banner = id+1;
	}
}

function activateAdLink(id){
	for (i=0; i<ad_links.length; i++) {
		if ( i!=id ){
			//ad_links[i].firstChild.className='';
			ad_links[i].innerHTML='<a href="javascript:showAd('+i+')">&nbsp;</a>'
		}else{
			//ad_links[i].firstChild.className='active-banner-link';
			ad_links[i].innerHTML='<span>&nbsp;</span>'
		}
	}
}

function activateAdText(id){
	for (i=0; i<ad_divs.length; i++) {
		if (ad_divs[i].className=='b-act') {
			if (ad_divs[i].id=='b-act-'+id){
				ad_divs[i].style.display='block';
			}else{
				ad_divs[i].style.display='none';
			}
		}
	}		
}

function showAd(id){
	rotate_banners = false;
	activateAd(id);
}
function rotateAd(){
	if (!rotate_banners){
		return
	}
	activateAd(next_banner);
	setTimeout('rotateAd()',rotate_timeout);	
}

activateAd(0);
setTimeout('rotateAd()',rotate_timeout);

function prevAd(){
	rotate_banners = false;
	activateAd(prev_banner);
}
function nextAd(){
	rotate_banners = false;
	activateAd(next_banner);
}
