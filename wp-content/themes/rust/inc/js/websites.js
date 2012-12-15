jQuery(document).ready(function($){
	$('.website')
		.parent('article')
		.height($(this).height());
	$('.website')
		.css('height', '100px')
		.hover(function(){
				$(this)
					.stop()
					.animate( {'height': $(this).find('img').outerHeight()}, 1000, function(){
						$(this)
							.find('h1')
							.fadeIn('fast');
					} )
					
			}, function(){
				$(this)
					.find('h1')
					.fadeOut('fast');
				$(this)
					.stop()
					.animate({'height': '100px'}, 1000);
					
			})
		.find('h1')
		.fadeOut(0);
});