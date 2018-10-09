$(function() {
	var cur = 0;

	$(".popup-close").on('click', function() {
		$("#popup-wrapper").hide();
		$(".step1.marker_show").css('cssText', 'display: block !important');
		$(".step_indicator").removeClass('hidden');
	});
	
	$(".picture_list li").on('click', function() {

		var txt = $(this).parent('.picture_list').next('.picture_selected_txt');
		var that = $(this);
		$(this).parent().addClass('choose');
		txt.fadeIn();
		setTimeout(function(){
			txt.hide();
			$('.step_indicator li').eq(cur).removeClass('active');
			cur++;
			$('.step_indicator li').eq(cur).addClass('active');
			if(cur == 4){
				$('.step4').hide();
				$(".step_indicator").addClass('hidden');
				$(".results").css('cssText', 'display: block !important');
			}
			else {
				that.parent().parent().parent().hide().next().css('cssText', 'display: block !important');
			}
		}, 800)

	});
})