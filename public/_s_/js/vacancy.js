$(document).ready(function() {
    cinputdate_InitPicker();
    if($.cookie('resume_search_full_stazh') == null || $.cookie('vacancy_search_full_stazh') == null)
    {
      vacancy_SetUpCookies(99, 'не имеет значения', '', '');
      vacancy_SetUpCookiesSoisk(99, 'не имеет значения', '', '', 0);
    }
    vacancy_SetDefaultCookies();
	$('.vacancy_filter_search_block').trigger('click');
	$('.resume_filter_search_block').trigger('click');
});
$(document).on('click', '.full_stazh_top', function()
{
    if($(this).hasClass('close_full_stazh'))
    {
        $(this).removeClass("close_full_stazh").addClass("open_full_stazh");
        $(this).next(".full_stazh_main").show();
    }
    else
    {
        $(this).removeClass("open_full_stazh").addClass("close_full_stazh");
        $(this).next(".full_stazh_main").hide();
    }
});
$(document).on('click', ".vacancy_icon_delete",function()
{
    var vacancy_id = $(this).attr('id');
    vacancy_id = vacancy_id.substring(13);
    vacancy_DeleteVacancy(vacancy_id);
});
$(document).on('click', "#resume_add_stazh_block",function()
{
    var vac_full_stazh_hid = $('#vac_full_stazh_hid').val();
    //vacancy_id = vacancy_id.substring(13);
    vacancy_AddStazhBlockInResume(vac_full_stazh_hid);
});
$(document).on('click', '.full_vacancy_top',function()
{
    if($(this).hasClass('close_full_vacancy'))
    {
        $(this).removeClass("close_full_vacancy").addClass("open_full_vacancy").html("Скрыть <<");
        $(this).prev(".full_vacancy_main").show();
    }
    else
    {
        $(this).removeClass("open_full_vacancy").addClass("close_full_vacancy").html("Подробнее >>");
        $(this).prev(".full_vacancy_main").hide();
    }
});

$(document).on('click', '.vacancy_toogle_oms_info',function()
{
    var vac_oms_info_hid = $(this).attr('id');
    vac_oms_info_hid = vac_oms_info_hid.substring(10);
    if($(this).hasClass('close_oms_info'))
    {
        $(this).removeClass("close_oms_info").addClass("open_oms_info").html("Скрыть");
        $('#org_resume_block_id'+vac_oms_info_hid+' .org_resume_block_m').show();
        $('#vac_info_oms_id'+vac_oms_info_hid).show();
    }
    else
    {
        $(this).removeClass("open_oms_info").addClass("close_oms_info").html("Показать подробнее");
        $('#org_resume_block_id'+vac_oms_info_hid+' .org_resume_block_m').hide();
        $('#vac_info_oms_id'+vac_oms_info_hid).hide();
    }
});

$(document).on('click', ".vacancy_izbr",function()
{
    var vacancy_id = $(this).attr('id');
    vacancy_id = vacancy_id.substring(10);
    vacancy_ChangeStatIzbrVacancy(vacancy_id);
});
$(document).on('click', ".vacancy_otclick",function()
{
    var vacancy_id = $(this).attr('id');
    vacancy_id = vacancy_id.substring(10);
    vacancy_ChangeStatOtclickVacancy(vacancy_id);
});
$(document).on('click', ".stud_otclick_otkl",function()
{
    var otclick_id = $(this).attr('id');
    otclick_id = otclick_id.substring(22);
    //alert(otclick_id);
    vacancy_RejectOtclickPractice(otclick_id);
});
$(document).on('click', ".vacancy_izbr_s",function()
{
    var vacancy_id = $(this).attr('id');
    vacancy_id = vacancy_id.substring(10);
    vacancy_ChangeStatIzbrVacancyMain(vacancy_id);
});
$(document).on('click', ".resume_izbr",function()
{
    var resume_id = $(this).attr('id');
    resume_id = resume_id.substring(9);
    vacancy_ChangeStatIzbrResume(resume_id);
});
$(document).on('click', ".vacancy_vac_otclick_remove",function()
{
    var otclick_id = $(this).attr('id');
    otclick_id = otclick_id.substring(22);
    vacancy_RejectOtclickSoiskFromRab(otclick_id);
});
$(document).on('click', ".vacancy_soisk_vac_otclick_remove",function()
{
    var otclick_id = $(this).attr('id');
    otclick_id = otclick_id.substring(22);
    vacancy_RemoveOtclickSoisk(otclick_id);
});
$(document).on('click', ".vacancy_practice_otclick_remove",function()
{
    var otclick_id = $(this).attr('id');
    otclick_id = otclick_id.substring(27);
    vacancy_RemoveOtclickStud(otclick_id);
});
$(document).on('click', ".resume_izbr_r",function()
{
    var resume_id = $(this).attr('id');
    resume_id = resume_id.substring(9);
    vacancy_ChangeStatIzbrResumeMain(resume_id);
});
$(document).on('click', ".add_week_for_finish_date",function()
{
    var vacancy_id = $(this).attr('id');
    vacancy_id = vacancy_id.substring(18);
    vacancy_AddWeekForVacancyFinishDate(vacancy_id);
});
$(document).on('click', ".resume_filter_search_block",function()
{
    vacancy_SortResumeList();
});
$(document).on('click', ".vacancy_filter_search_block",function()
{
    vacancy_SortVacancyList();
});
$(document).on('click', ".remove_stazh_block",function()
{
    var block_id = $(this).attr('id');
    block_id = block_id.substring(21);
    vacancy_RemoveStazhBlock(block_id);
});
$(document).on('click', ".org_resume_practic",function()
{
    var org_id = $(this).attr('id');
    org_id = org_id.substring(13);
    practice_spec = $("#practice_spec"+org_id).val();
    vacancy_WantPractic(org_id, practice_spec);
});
function vacancy_ChangeStatIzbrResume(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/change_stat_izbr_resume',
    {
        csrfmiddlewaretoken: cToken,
        resume_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            $('#resume_id'+var_id).removeClass('resume_remove_izbr').addClass('resume_add_izbr');
        }
        else if (data == 'add')
        {
            $('#resume_id'+var_id).removeClass('resume_add_izbr').addClass('resume_remove_izbr');
        } else {}
    });
}
function vacancy_RemoveBreadcrumbs()
{
    $('.l-breadcrumbs').remove();
}
function vacancy_RejectOtclickSoiskFromRab(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/reject_otclick_soisk_from_rab',
    {
        csrfmiddlewaretoken: cToken,
        otclick_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            $('#vacancy_otclick_id'+var_id).remove();
        } else {}
    });
}
function vacancy_RemoveOtclickSoisk(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/remove_otclick_soisk',
    {
        csrfmiddlewaretoken: cToken,
        otclick_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            $('#soisk_otclick_block_id'+var_id).remove();
        } else {}
    });
}
function vacancy_RemoveOtclickStud(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/remove_otclick_stud',
    {
        csrfmiddlewaretoken: cToken,
        otclick_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            $('div#practice_block_id'+var_id).next('hr').remove();
            $('div#practice_block_id'+var_id).remove();
        } else {}
    });
}
function vacancy_AddWeekForVacancyFinishDate(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/vacancy_add_finish_date',
    {
        csrfmiddlewaretoken: cToken,
        vacancy_id: var_id
    },
    function(data) {
        $('#span_finish_date_add_id'+var_id).html(data);
    });
}
function vacancy_ChangeStatIzbrResumeMain(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/change_stat_izbr_resume',
    {
        csrfmiddlewaretoken: cToken,
        resume_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            $('div#resume_block_id'+var_id).next('hr').remove();
            $('div#resume_block_id'+var_id).remove();
        }
        else if (data == 'add')
        {
            $('#resume_id'+var_id).removeClass('resume_add_izbr').addClass('resume_remove_izbr');
        } else {}
    });
}
function vacancy_WantPractic(var_id, name_spec)
{
    var cToken = $('#csrf-token').val();
    if (name_spec == '')
    {
        alert('Заполните графу специальность');
    }
    else
    {
        $.post('http://'+window.location.hostname+'/vacancies/statistics/want_practice',
        {
            csrfmiddlewaretoken: cToken,
            org_resume_id: var_id,
            name_spec: name_spec
        },
        function(data) {
            if (data == 'add')
            {
                $("#practice_spec"+var_id).parent().parent().remove();
                $('#org_resume_id'+var_id).removeClass('org_resume_practic').html('Подана заявка на прохождение практики');
            } else {}
        });
    }
}
function vacancy_RemoveStazhBlock (var_id)
{
    $("#full_stazh_block_id"+var_id).remove();
}
function vacancy_SortResumeList()
{
    var cToken = $('#csrf-token').val();
    var full_stazh = $('#resume_filter_full_stazh #resume_filter_input_stazh').val();
    var pol = $('#resume_filter_pol #resume_filter_input_pol').val();
    var min_date = $('#resume_filter_date_min #resume_min_date').val();
    var max_date = $('#resume_filter_date_max #resume_max_date').val();
    var obl_prof_deyat = $('#vacancy_searchbox_profarea').val();
	var num_page = $('#vac_num_page').val();
    vacancy_SetUpCookies(full_stazh,pol,min_date,max_date);
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/sort_resume_list',
    {
        csrfmiddlewaretoken: cToken,
        full_stazh: full_stazh,
        pol: pol,
        min_date: min_date,
        max_date: max_date,
		num_page: num_page,
        obl_prof_deyat: obl_prof_deyat
    },
    function(data) {
        if(data !== '')
        {
            $('.resume_all_block').empty().html(data);
        }
    });
}
function vacancy_SortVacancyList()
{
    var cToken = $('#csrf-token').val();
    var caption = $('#vacancy_filter_cap #vacancy_filter_input_cap').val();
    var full_stazh = $('#vacancy_filter_full_stazh #vacancy_filter_input_stazh').val();
    var rabday = $('#vacancy_filter_rabday #vacancy_filter_input_rabday').val();
    var num_page = $('#vac_num_page').val();
    var min_opl = $('#vacancy_filter_opl #vacancy_min_opl').val();
    var max_opl = $('#vacancy_filter_opl #vacancy_max_opl').val();
	vacancy_SetUpCookiesSoisk(full_stazh,rabday,min_opl,max_opl,caption);
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/sort_vacancy_list',
    {
        csrfmiddlewaretoken: cToken,
        caption: caption,
        full_stazh: full_stazh,
        rabday: rabday,
		num_page: num_page,
        min_opl: min_opl,
        max_opl: max_opl
    },
    function(data) {
        if(data !== '')
        {
            $('.vacancy_all_block').empty().html(data);
        }
    });
}
function  vacancy_SetUpCookies(full_stazh,pol,min_date,max_date)
{
    $.cookie('resume_search_full_stazh', full_stazh, { expires: 30, path: '/' });
    $.cookie('resume_search_pol', pol, { expires: 30, path: '/' });
    $.cookie('resume_search_min_date', min_date, { expires: 30, path: '/' });
    $.cookie('resume_search_max_date', max_date, { expires: 30, path: '/' });
}
function  vacancy_SetUpCookiesSoisk(full_stazh,rabday,min_opl,max_opl,obl_prof_deyat)
{
    $.cookie('vacancy_search_full_stazh', full_stazh, { expires: 30, path: '/' });
    $.cookie('vacancy_search_rabday', rabday, { expires: 30, path: '/' });
    $.cookie('vacancy_search_min_opl', min_opl, { expires: 30, path: '/' });
    $.cookie('vacancy_search_max_opl', max_opl, { expires: 30, path: '/' });
    $.cookie('vacancy_search_obl_prof_deyat', obl_prof_deyat, { expires: 30, path: '/' });
}
function  vacancy_SetDefaultCookies()
{
    $('#resume_filter_full_stazh #resume_filter_input_stazh').val($.cookie('resume_search_full_stazh'));
    $('#resume_filter_pol #resume_filter_input_pol').val($.cookie('resume_search_pol'));
    $('#resume_filter_date_min #resume_min_date').val($.cookie('resume_search_min_date'));
    $('#resume_filter_date_max #resume_max_date').val($.cookie('resume_search_max_date'));
    $('#vacancy_filter_cap #vacancy_filter_input_cap').val($.cookie('vacancy_search_obl_prof_deyat'));
    $('#vacancy_filter_full_stazh #vacancy_filter_input_stazh').val($.cookie('vacancy_search_full_stazh'));
    $('#vacancy_filter_rabday #vacancy_filter_input_rabday').val($.cookie('vacancy_search_rabday'));
    $('#vacancy_filter_opl #vacancy_min_opl').val($.cookie('vacancy_search_min_opl'));
    $('#vacancy_filter_opl #vacancy_max_opl').val($.cookie('vacancy_search_max_opl'));
}
function cinputdate_InitPicker()
{
 $(".vinputdate_input").datetimepicker({
        lang: 'ru',
        format: 'd.m.Y',
        timepicker:false,
        yearStart:1920,
		yearEnd:2030
 });
}
function vacancy_ChangeStatIzbrVacancy(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/change_stat_izbr_vacancy',
    {
        csrfmiddlewaretoken: cToken,
        vacancy_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            $('#vacancy_id'+var_id).removeClass('vacancy_remove_izbr').addClass('vacancy_add_izbr');
        }
        else if (data == 'add')
        {
            $('#vacancy_id'+var_id).removeClass('vacancy_add_izbr').addClass('vacancy_remove_izbr');
        } else {}
    });
}
function vacancy_ChangeStatOtclickVacancy(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/otclick_vacancy',
    {
        csrfmiddlewaretoken: cToken,
        vacancy_id: var_id
    },
    function(data) {
        if (data == 'add')
        {
            $('div#vacansy_id'+var_id).remove()
        } else {}
    });
}
function vacancy_RejectOtclickPractice(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/otclick_practice_reject',
    {
        csrfmiddlewaretoken: cToken,
        otclick_id: var_id
    },
    function(data) {
        if (data == 'remove')
        {
            $('div#stud_otclick_block_id'+var_id).next('hr').remove();
            $('div#stud_otclick_block_id'+var_id).remove();
        } else {}
    });
}
function vacancy_ChangeStatIzbrVacancyMain(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/change_stat_izbr_vacancy',
    {
        csrfmiddlewaretoken: cToken,
        vacancy_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            //$('div#resume_block_id'+var_id).next('hr').remove();
            $('div#vacancy_block_'+var_id).remove();
        }
        else if (data == 'add')
        {
            $('#vacancy_block_'+var_id).removeClass('resume_add_izbr').addClass('resume_remove_izbr');
        } else {}
    });
}
function vacancy_DeleteVacancy(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/delete_vacancy',
    {
        csrfmiddlewaretoken: cToken,
        vacancy_id: var_id
    },
    function(data) {
        if(data == 'remove')
        {
            //$('#vacancy_block_'+var_id).hide();
            $('div#vacancy_block_'+var_id).remove()
        } else {}
    });
}
function vacancy_AddStazhBlockInResume(var_id)
{
    var cToken = $('#csrf-token').val();
    $.post( 'http://'+window.location.hostname+'/vacancies/statistics/add_stazh_block',
    {
        csrfmiddlewaretoken: cToken,
        spec_id: var_id
    },
    function(data) {
        if(data !== '')
        {
            //$('#vacancy_block_'+var_id).hide();
            $('.vacancy_soisk_full_stazh_block').append(data);
            var tid = parseInt(var_id)+1;
            $('#vac_full_stazh_hid').val(tid);
            cinputdate_InitPicker();
        } else {}
    });
}