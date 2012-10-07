$(function(){

	function smoothScroll($target, offset) {
		if (!($target instanceof jQuery) && typeof $target != 'undefined') {
			offset = $target;
			$target = null;
		}
		offset = offset || 0;
		if ($target && $target.length != 0) {
			offset = $target.offset().top - offset;
		} else {
			offset = 0;
		}

		$('html, body').stop().animate({
			scrollTop: offset
		}, 400, 'swing');
	}

	// Back to top link
	var $toTop = $('#to-top').on('click', function(e){
		e.preventDefault();
		smoothScroll();
	}).hide();

	$(window).scroll(function(){
		var sT = $(this).scrollTop();
		if(sT > 200){
			$toTop.fadeIn(500);
		}else{
			$toTop.fadeOut(500);
		}
	});

	// Navigation stuff
	var $pageHeader = $('#page-header');
	$pageHeader.on({
		'mouseover mouseout' : function(){
			var $this = $(this);
			$this.toggleClass('open');
		}
	});

	$('#page-nav li a').each(function(){
		var $ul = $(this).siblings('ul');
		$ul.data('open-height', $ul.outerHeight()).css('height', 0);
	}).on({
		'click' : function(e){
			e.preventDefault();
			smoothScroll($($(this).attr('href')), 68);
			var $li = $(this).closest('li'),
				$ul = $li.find('ul');
			if($li.hasClass('open')){
				$li.removeClass('open');
				$ul.css('height', 0);
			} else {
				$li.addClass('open');
				$ul.css('height', $ul.data('open-height'));
			}
		}
	});

});
