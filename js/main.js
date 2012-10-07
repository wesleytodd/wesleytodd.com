$(function(){

	// tabs
	$('.pattern-code').each(function(){
		var $this = $(this),
			$tabs = $this.find('.pattern-code-content'),
			$nav  = $('<div class="pattern-code-nav" />');

		$tabs.each(function(){
			var $button = $('<button />')
				.data({
					'pattern-content' : $(this),
					'pattern' : $this
				})
				.html($(this).data('content'))
				.click(function(e){
					e.preventDefault();
					goToTab($(this));
				});
			$nav.append($button);
		}).eq(0).before($nav);
		goToTab($nav.find('button').eq(0));
	});

	function goToTab($tab){
		$tab.siblings('button').removeClass('active');
		$tab.addClass('active');
		$tab.data('pattern').find('.pattern-code-content').hide();
		$tab.data('pattern-content').show();
	};

	// Navigation stuff
	var $pageNav = $('#page-nav');
	$pageNav.on({
		'mouseover mouseout' : function(){
			var $this = $(this);
			$this.toggleClass('open');
		}
	});
	$('#input-search').on({
		'focus' : function(){
			$pageNav.addClass('force-open');
		},
		'blur' : function(){
			if($(this).val() == '') $pageNav.removeClass('force-open');
		}
	});

	$('#page-nav li a').each(function(){
		var $ul = $(this).siblings('ul');
		$ul.data('open-height', $ul.outerHeight()).css('height', 0);
	}).on({
		'click' : function(e){
			e.preventDefault();
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


	// Header switcherro & back to top
	function closest(num, array){
		var cH = Number.MAX_VALUE,
			cL = Number.MIN_VALUE;
		$.each(array, function(k, v){
			if(v < num && v > cL){
				cL = v;
			}else if(v > num && v < cH){
				cH = v;
			}else if(v == num){
				cL = v;
				cH = v;
			}
		});
		if(cL == Number.MIN_VALUE){
			cL = null;
		}
		if(cH == Number.MAX_VALUE){
			cH = null;
		}
		return {
			low  : array.indexOf(cL),
			high : array.indexOf(cH)
		};
	}

	var $pageHeader = $('#page-header h1'),
		$patterns   = $('.pattern'),
		$toTop      = $('#to-top').hide(),
		resizeTimeout,
		offsets,
		extraPad;

	$toTop.click(function(e){
		e.preventDefault();
		$('body').animate({
			'scrollTop' : 0
		}, 1000);
	});

	function update(){
		var sT = $(this).scrollTop();
		$pageHeader.css('top', -sT);

		if(sT > 200){
			$toTop.fadeIn(500);
		}else{
			$toTop.fadeOut(500);
		}

		var two = closest(sT, offsets),
			$above,
			$below;

		$patterns.removeClass('active');
		if(two.low != -1){
			$above = $patterns.eq(two.low);
			$above.addClass('active');
		}
		if(two.high != -1){
			$below = $patterns.eq(two.high);
			if(two.low != -1){
				var diff = $below.data('offset-top') - $below.find('.pattern-name').height() - sT;
				if(diff < 0){
					$above.find('.pattern-name').css('top', diff);
				}else{
					$above.find('.pattern-name').css('top', 0);
				}
			}
		}
	};

	function updateOffsets(){
		offsets = [];
		extraPad = 0;
		$patterns.each(function(i, v){
			var $this = $(this),
				pad   = parseInt($this.css('padding-top')),
				off   = $this.offset().top + pad + extraPad;
			extraPad += pad;
			offsets.push(off);
			$this.data('offset-top', off);
		});
	};

	$(window).scroll(function(){
		update();
	}).resize(function(){
		clearTimeout(resizeTimeout);
		resizeTimeout =  setTimeout(function(){
			updateOffsets();
			update();
		}, 500);
	});

	setTimeout(function(){
		updateOffsets();
	}, 500);
	updateOffsets();

});
