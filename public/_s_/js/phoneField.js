$ = django.jQuery
phone_template = '<div>Служба: <input class="info" value="Телефон" type=text size="22" /> Номер телефона: <input class="country" type="text" value=" +7" size="2" /> - <input class="code" type="text" value="8652" size="5" /> - <input class="phone" type="text" size="8" /> <span onclick="delete_phone_info(this)" style="cursor: pointer; color: #FF0000;">Удалить</span></div>'

function add_phone_template(){
	$('div#block_phones').find('span').show()
    $('div#block_phones').append(phone_template);
};

function phone_info_add(info, country, code, phone){
	phone_info = '<div>Служба: <input class="info" value="'+info+'" type=text size="22" /> Номер телефона: <input class="country" type="text" value="'+country+'" size="2" readonly /> - <input class="code" type="text" value="'+code+'" size="5" /> - <input class="phone" type="text" value="'+phone+'" size="8" /> <span onclick="delete_phone_info(this)" style="cursor: pointer; color: #FF0000;">Удалить</span></div>'
    $('div#block_phones').append(phone_info);
};

function delete_phone_info(event){
	$(event).parent().remove()
	if ($('div#block_phones').find('span').length==1){
		$('div#block_phones').find('span').hide()
	}
}

$(document).ready(function(){Phones:
	$('form').submit(function(){
		flag_error = true
		flag_error_length = true
		pattern = /^[0-9]+$/;
		$('div#block_phones > div').each(function(){
			length_phone = $(this).find('.code').attr('value').length+$(this).find('.phone').attr('value').length
			$(this).find('.code').css('background-color', '#FFFFFF').css('border-color', '#CCCCCC')
			$(this).find('.phone').css('background-color', '#FFFFFF').css('border-color', '#CCCCCC')
			if(pattern.test($(this).find('.code').attr('value'))==false){
				$(this).find('.code').css('border-color', '#FF0000')
				flag_error=false
			}

			if(pattern.test($(this).find('.phone').attr('value'))==false){
				$(this).find('.phone').css('border-color', '#FF0000')
				flag_error=false
			}
			
			if(length_phone!=10 && $(this).find('.phone').attr('value').length>0 && $(this).find('.code').attr('value').length>0){
				flag_error_length=false
				$(this).find('.code').css('background-color', '#ffc9c9').css('border-color', '#FF0000')
				$(this).find('.phone').css('background-color', '#ffc9c9').css('border-color', '#FF0000')
			}
		})
		
		if (flag_error==false && flag_error_length==false){
			alert('Поле не может быть пустым и должно содержать только цифры\nНе верное количество цифр в коде или номере их количество в сумме должно быть равным 10')
			return false
		}
		else if(flag_error==false){
			alert('Поле не может быть пустым и должно содержать только цифры')
			return false
		}
		else if(flag_error_length==false){
			alert('Не верное количество цифр в коде или номере их количество в сумме должно быть равным 10')
			return false
		}
		else {
			value = ''
			$('div#block_phones > div').each(function(){
				$(this).find('input').each(function(){
					if ($(this).attr('class')=='info'){
						if(value.length!=0){
							value += '\n'
						}
						if($(this).attr('value').length!=0){
							value += $(this).attr('value') + ':'
						}
						else{
							value += 'Телефон:'
						}
					}
					else if ($(this).attr('class')=='country'){
						value += $(this).attr('value')+'-'
					}
					else if ($(this).attr('class')=='code'){
						value += $(this).attr('value')+'-'
					}
					else if ($(this).attr('class')=='phone'){
						value += $(this).attr('value')
					}
				})
			})
			$('input#id_phones').attr('value', value)
			return true
		}
	})
	
	hidden_field = $('input#id_phones')
	values_phones = hidden_field.attr('value')
	if (values_phones.length>0){
		split_info = values_phones.split('\n')
		hidden_field.after('<p> <span onclick="add_phone_template()" style="cursor: pointer; color: #5B80B2;">Добавить телефон справочной службы</span></p><div id="block_phones"></div>')
		for(phone_info in split_info){
			info = split_info[phone_info].split(':')[0]
			phone_all=split_info[phone_info].split(':')[1]
			split_phone = phone_all.split('-')
			country = split_phone[0]
			code = split_phone[1]
			phone = split_phone[2]
			phone_info_add(info, country, code, phone)
		}
	}
	else{
		hidden_field.after('<p> <span onclick="add_phone_template()" style="cursor: pointer; color: #5B80B2;">Добавить телефон справочной службы</span></p><div id="block_phones">'+phone_template+'</div>')
	}
	if ($('div#block_phones').find('span').length==1){
		$('div#block_phones').find('span').hide()
	}
});