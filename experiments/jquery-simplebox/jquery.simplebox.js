/*
 * SimpleBox
 * 
 * A jQuery Lightbox plugin
 * 
 * Author: Wes Todd (http://wesleytodd.com)
 * Plugin Homepage: http://wesleytodd.com/custom-plugins/simplebox/
 * Version: 1.1
 * 
 * Based on: http://css-tricks.com/snippets/jquery/jquery-plugin-template/
 * 
 */
(function($){
    $.jwtSimpleBox = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("jwtSimpleBox", base);

		base.init = function(){
			if( typeof( options ) === "undefined" || options === null ) options = {};
			base.options = $.extend({},$.jwtSimpleBox.defaultOptions, options);

            //Setup the overlay
            base.overlay = $('#jwt_overlay');
            if( base.overlay.length == 0 ){
            	base.overlay = $(document.createElement('div')).attr('id', 'jwt_overlay');
            }
            base.overlay.css( {
				'background'	: base.options.overlay_background,
				'z-index'		: base.options.overlay_zindex
			} );
			
			//Setup the lightbox
			base.$el.css({
				'z-index'		: base.options.lightbox_zindex
			});

			//Conditionals for fixed positioning
			base.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(Android)/i) != null;
			
			if(base.options.use_fixed  && !base.isMobile){
				base.bFixedSupported = base.fncFixedPositionSupported();
			}else{
				base.bFixedSupported = false;
			}
			
            if(base.bFixedSupported){
				base.overlay.css( {
					'position'		: 'fixed'
				} );
				base.$el.css( {
					'position'		: 'fixed'
				} );
			}else{
				base.overlay.css( {
					'position'		: 'absolute'
				} );
				base.$el.css({
					'position'		: 'absolute'
				});
				$(window).scroll(function(){
					base.updateOverlay();
					base.updateLightbox();
				});
			}
			
			
			//Things to run on init
			base.updateOverlay();
			base.updateLightbox();
			
			
			//Event Listeners
			$(window).resize(function(){
				base.updateOverlay();
				base.updateLightbox();
			});
			
			$(base.options.show_event_target).live(base.options.show_event_type, function(e){
				base.showOverlay();
				base.showLightbox();
				base.updateLightbox();
				return false;
			});
			
			$(base.options.hide_event_target).live(base.options.hide_event_type, function(e){
				base.hideOverlay();
				base.hideLightbox();
				return false;
			});
			
			if(base.options.show_now){
				base.showOverlay();
				base.showLightbox();
				base.updateLightbox();
			}

        };
		
		base.updateOverlay = function(){
			base.overlay
				.width( $(window).width() )
				.height( $(window).height() );
				
			if(base.bFixedSupported){
				base.overlay.css( {
					'top'		: '0',
					'left'		: '0'
				} );
			}else{
				base.overlay.css( {
					'top'	: $(window).scrollTop(),
					'left'	: $(window).scrollLeft()
				} );
			}
		}
		
		base.updateLightbox = function(){
			var newcss,
				css = {
				'height'	: 'auto',
				'overflow'	: 'visible'
			};
			if( $(window).height() > ( base.$el.outerHeight() ) && ( $(window).height() / 2.2 ) - ( base.$el.outerHeight() / 2 ) > 0 ){
				if(base.bFixedSupported){
					css = $.extend(css,{
						'top'	: ( $(window).height() / 2.2 ) - ( base.$el.outerHeight() / 2 ),
						'left'	: ( $(window).width() / 2 ) - ( base.$el.outerWidth() / 2 )
					});
				}else{
					css = $.extend(css,{
						'top'	: ( $(window).height() / 2 ) + $(window).scrollTop() - ( base.$el.height() / 2 ),
						'left'	: ( $(window).width() / 2 ) + $(window).scrollLeft() - ( base.$el.width() / 2 )
					} );
				}
			}else{
				css = $.extend(css,{
					'height'	: $(window).height() - parseInt( base.$el.css('padding-top') ) - parseInt( base.$el.css('padding-bottom') ) - 30,
					'overflow'	: 'scroll'
				} );
				if(base.bFixedSupported){
					css = $.extend(css,{
						'top'	: '10px',
						'left'	: ( $(window).width() / 2 ) - ( base.$el.outerWidth() / 2 )
					} );
				}else{
					css = $.extend(css,{
						'top'	: (10 + $(window).scrollTop()).toString() + 'px',
						'left'	: ( $(window).width() / 2 ) + $(window).scrollLeft() - ( base.$el.width() / 2 )
					} );
				}
			}
			if(typeof base.options.position_filter == 'function'){
				newcss = base.options.position_filter.call(base.$el, css);
			}
			if(newcss != undefined){
				css = $.extend({}, css, newcss);
			}
			if(navigator.userAgent.match(/iPad/i) != null){
				css = base.ipadInputFix( css );
			}
			base.$el.css( css );

		}
		
		base.showOverlay = function(){
			$('body').append(base.overlay);
			base.overlay.css('display', 'block');
		}
		
		base.showLightbox = function(){
			$('body').append(base.$el);
			if(base.options.show_function == 'show'){
				base.$el.show(base.options.show_duration, base.options.show_easing, null);
			}else if(base.options.show_function == 'fadeIn'){
				base.$el.fadeIn(base.options.show_duration, base.options.show_easing, null);
			}else if(base.options.show_function == 'slideDown'){
				base.$el.slideDown(base.options.show_duration, base.options.show_easing, null);
			}else{
				base.$el.show();
			}
			if(typeof base.options.show_cb == 'function'){
				base.options.show_cb.call(base);
			}
			
		}
		
		base.hideOverlay = function(){
			base.overlay.css('display', 'none');
		}
		base.hideLightbox = function(){
			if(base.options.hide_function == 'hide'){
				base.$el.hide(base.options.hide_duration, base.options.hide_easing, null);
			}else if(base.options.show_function == 'fadeOut'){
				base.$el.fadeOut(base.options.hide_duration, base.options.hide_easing, null);
			}else if(base.options.show_function == 'slideUp'){
				base.$el.slideUp(base.options.hide_duration, base.options.hide_easing, null);
			}else{
				base.$el.hide();
			}
			if(base.isMobile){
				base.$el.find('input').blur();
			}
			if(typeof base.options.hide_cb == 'function'){
				base.options.hide_cb.call(base);
			}
		}
		
		base.ipadInputFix = function( css ){
			var newcss = {};
			if(base.$el.find('input:focus').length > 0){
				newcss = {
					'position'	: 'absolute',
					'top'		: 10 + $(window).scrollTop(),
					'height'	: '200px',
					'overflow'	: 'scroll'
				};
			}
			var out = $.extend({}, css, newcss);
			return out;
		}
		/*
		 * Feature Detection for position: fixed;
		 * http://kangax.github.com/cft/#IS_POSITION_FIXED_SUPPORTED
		 */
		base.fncFixedPositionSupported = function(){
			var container = document.body;
			if (document.createElement && container && container.appendChild && container.removeChild) {
				var el,
					originalHeight,
					elementTop,
					isSupported;
					
				el = document.createElement("div");
					
				if (!el.getBoundingClientRect) {
					return false;
				}
				el.innerHTML = "x";
				el.style.cssText = "position:fixed;top:100px;";
				container.appendChild(el);
				originalHeight = container.style.height, originalScrollTop = container.scrollTop;
				container.style.height = "3000px";
				container.scrollTop = 500;
				elementTop = el.getBoundingClientRect().top;
				container.style.height = originalHeight;
				isSupported = elementTop === 100;
				container.removeChild(el);
				container.scrollTop = originalScrollTop;
				return isSupported;
			}
			return false;
		}
				
        // Run initializer
        base.init();
    };

    $.jwtSimpleBox.defaultOptions = {
		overlay_zindex		: '999998',
		lightbox_zindex		: '999999',
		overlay_background	: 'rgba(0,0,0,.6)',
		show_event_type		: 'click',
		show_event_target	: null,
		show_function		: 'show',
		show_duration		: 0,
		show_easing			: 'swing',
		hide_event_type		: 'click touchstart',
		hide_event_target	: '#jwt_overlay, #jwt_close',
		hide_function		: 'hide',
		hide_duration		: 0,
		hide_easing			: 'swing',
		hide_cb				: null,
		use_fixed			: true,
		show_now			: false,
		position_filter		: null
    };

	$.fn.jwtSimpleBox = function(options){
		return this.each(function(){
			$(this).css('display', 'none');
			(new $.jwtSimpleBox(this, options));
		});
	};

})(jQuery);