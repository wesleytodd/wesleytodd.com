if(!Modernizr.input.placeholder) {
	jQuery(document).ready(function($) {
		$('#login-holder input').not('input[type=submit]').wrap('<div class="input-wrap" />').each(function() {
			$(this).before('<label for="' + $(this).attr('name') + '">' + $(this).attr('placeholder') + '</label>');
		}).focus(function() {
			$('label[for=' + $(this).attr('name') + ']').addClass('focus');
		}).blur(function() {
			$('label[for=' + $(this).attr('name') + ']').removeClass('focus');
		}).keyup(function() {
			if($(this).val() != '') {
				$('label[for=' + $(this).attr('name') + ']').addClass('hide');
			} else {
				$('label[for=' + $(this).attr('name') + ']').removeClass('hide');
			}
		});
	});
}