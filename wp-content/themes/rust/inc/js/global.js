jQuery(document).ready(function($){
	
	/*
	 * Navigation Hover Effect
	 */
	function animateIndicator($newEl, speed){
		newWidth = $newEl.outerWidth();
		newPosX = $newEl.position().left + parseInt($newEl.css('margin-left'));
		
		$('#header-nav-indicator').stop().animate({
			'left': newPosX,
			'width': newWidth
		}, speed);
	}
	
	$curMenuItem = $('#menu-main-navigation li.current-menu-item');
	if($curMenuItem.length == 0) {
		$curMenuItem = $('#menu-main-navigation li.current-page-ancestor');
		if ($curMenuItem.length == 0) {
			$curMenuItem = $('#menu-main-navigation #menu-item-400');
		}
	}
	
	$('#header-main-navigation').append('<div id="header-nav-indicator" />');
	$curMenuItem.css('border-bottom', 'none');
	
	animateIndicator($curMenuItem, 0);
	setTimeout(function(){
		animateIndicator($curMenuItem, 0);
	}, 800);
	
	$('#menu-main-navigation li').live('mouseover mouseout', function(e){
		if(e.type == 'mouseover')
			animateIndicator($(this), 'medium');
		if(e.type == 'mouseout')
			animateIndicator($curMenuItem, 'medium');
	});
	
});

