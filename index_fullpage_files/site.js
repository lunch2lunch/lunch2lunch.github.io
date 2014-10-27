/*********************************************************************************
 * @name: bPopup
 * @author: (c)Bjoern Klinggaard (http://dinbror.dk/bpopup - twitter@bklinggaard)
 * @version: 0.7.0.min
 *********************************************************************************/
(function(b){b.fn.bPopup=function(n,p){function t(){b.isFunction(a.onOpen)&&a.onOpen.call(c);k=(e.data("bPopup")||0)+1;d="__bPopup"+k;l="auto"!==a.position[1];m="auto"!==a.position[0];i="fixed"===a.positionStyle;j=r(c,a.amsl);f=l?a.position[1]:j[1];g=m?a.position[0]:j[0];q=s();a.modal&&b('<div class="bModal '+d+'"></div>').css({"background-color":a.modalColor,height:"100%",left:0,opacity:0,position:"fixed",top:0,width:"100%","z-index":a.zIndex+k}).each(function(){a.appending&&b(this).appendTo(a.appendTo)}).animate({opacity:a.opacity},a.fadeSpeed);c.data("bPopup",a).data("id",d).css({left:!a.follow[0]&&m||i?g:h.scrollLeft()+g,position:a.positionStyle||"absolute",top:!a.follow[1]&&l||i?f:h.scrollTop()+f,"z-index":a.zIndex+k+1}).each(function(){a.appending&&b(this).appendTo(a.appendTo);if(null!=a.loadUrl)switch(a.contentContainer=b(a.contentContainer||c),a.content){case "iframe":b('<iframe scrolling="no" frameborder="0"></iframe>').attr("src",a.loadUrl).appendTo(a.contentContainer);break;default:a.contentContainer.load(a.loadUrl)}}).fadeIn(a.fadeSpeed,function(){b.isFunction(p)&&p.call(c);u()})}function o(){a.modal&&b(".bModal."+c.data("id")).fadeOut(a.fadeSpeed,function(){b(this).remove()});c.stop().fadeOut(a.fadeSpeed,function(){null!=a.loadUrl&&a.contentContainer.empty()});e.data("bPopup",0<e.data("bPopup")-1?e.data("bPopup")-1:null);a.scrollBar||b("html").css("overflow","auto");b("."+a.closeClass).die("click."+d);b(".bModal."+d).die("click");h.unbind("keydown."+d);e.unbind("."+d);c.data("bPopup",null);b.isFunction(a.onClose)&&setTimeout(function(){a.onClose.call(c)},a.fadeSpeed);return!1}function u(){e.data("bPopup",k);b("."+a.closeClass).live("click."+d,o);a.modalClose&&b(".bModal."+d).live("click",o).css("cursor","pointer");(a.follow[0]||a.follow[1])&&e.bind("scroll."+d,function(){q&&c.stop().animate({left:a.follow[0]&&!i?h.scrollLeft()+g:g,top:a.follow[1]&&!i?h.scrollTop()+f:f},a.followSpeed)}).bind("resize."+d,function(){if(q=s())j=r(c,a.amsl),a.follow[0]&&(g=m?g:j[0]),a.follow[1]&&(f=l?f:j[1]),c.stop().each(function(){i?b(this).css({left:g,top:f},a.followSpeed):b(this).animate({left:m?g:g+h.scrollLeft(),top:l?f:f+h.scrollTop()},a.followSpeed)})});a.escClose&&h.bind("keydown."+d,function(a){27==a.which&&o()})}function r(a,b){var c=(e.width()-a.outerWidth(!0))/2,d=(e.height()-a.outerHeight(!0))/2-b;return[c,20>d?20:d]}function s(){return e.height()>c.outerHeight(!0)+20&&e.width()>c.outerWidth(!0)+20}b.isFunction(n)&&(p=n,n=null);var a=b.extend({},b.fn.bPopup.defaults,n);a.scrollBar||b("html").css("overflow","hidden");var c=this,h=b(document),e=b(window),k,d,q,l,m,i,j,f,g;this.close=function(){a=c.data("bPopup");o()};return this.each(function(){c.data("bPopup")||t()})};b.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",closeClass:"bClose",content:"ajax",contentContainer:null,escClose:!0,fadeSpeed:250,follow:[!0,!0],followSpeed:500,loadUrl:null,modal:!0,modalClose:!0,modalColor:"#000",onClose:null,onOpen:null,opacity:0.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,zIndex:9997}})(jQuery);


/*********************************************************************************
 * Simple DOM elements.
 *********************************************************************************/
$(document).ready(function() {
	

	$("#header-search").autocomplete({
		minLength: 2,
		appendTo: '#header-search-wrapper',
		source: function( request, response ) {
			var term = request.term;
			if ( term in search_cache ) {
				response( search_cache[ term ] );
				return;
			}

			$('#header-search-loader').show();

			var src = $('#search-action').val();

			lastXhr = $.get(src, request, function( data, status, xhr ) {
				$('#header-search-loader').hide();
				search_cache[ term ] = data;
				if ( xhr === lastXhr ) {
					response( data );
				}
			});
		},
		select: function( event, ui ) {
			$('#slug').val(ui.item.slug);
			$(this).closest('form').submit();
		},
		open: function( event, ui ) {
			$('#header-search-wrapper').addClass('active');
		},
		close: function( event, ui ) {
			$('#header-search-wrapper').removeClass('active');
		}
	});
	
	$('.tooltip').on('click', function(e){
	    e.preventDefault;
	    $(this).find('.thetip').slideToggle('fast');
	
	});

	function open_dropdown(selector)
	{
		var $selector = $('#' + selector);
		$menu.show();	
	}
	
	function open_registerform() {
		$('#sign-up-overlay, #black-overlay').show();
		$('#sign-up-overlay').find('input[name="name"]').focus();
	}
	
	function open_whats_next() {
		$('#whats_next, #black-overlay').show();
	}
	
	function open_forgot_password() {
		$('#forgot_password, #black-overlay').show();
	}
	
	function open_forgot_new_password() {
		$('#forgot_new_password, #black-overlay').show();
	}
	
	function open_loginform() {
		$('#main-navigation').hide();
		$('#login-elements').show();
		$('#login-overlay').show();
		$('#logo').addClass('white');
		$('#login-elements').find('input[name="email"]').focus();
	}
	
	function display_cart_notification(form) {
		$('.cart-notification').stop().animate({
			'top' : '-5'
		},500, function() {
			
			form.closest('.block').removeClass('flip');

			$(this).delay(500).animate({
				'top' : '-2'
			}, 200, function() {
				$(this).find('span').animate({
					'top'  : '-75'
				}, 600, function() {
					$(this).animate({
						'top' : '15'
					}, 100);
				});

				$(this).delay(100).animate({
					'top' : '-75'
				}, 400);
			});
		});
	}
	
	$('#betablokker').click(function(e) {
		e.preventDefault();
		
		$(this).remove();
	});
	
	if(window.location.hash == '#login')
	{
		if($('#my-profile').length == 0)
		{
			open_loginform();
		}
	}
	else if(window.location.hash == '#register')
	{
		if($('#my-profile').length == 0)
		{
			open_registerform();
		}
	}
	else if(window.location.hash == '#whats_next')
	{
		open_whats_next();
	}
	else if(window.location.hash == '#whats_next#2')
	{
		open_whats_next_2();
	}
	else if(window.location.hash == '#forgot_password')
	{
		open_forgot_password();
	}
	else if(window.location.hash == '#forgot_new_password')
	{
		open_forgot_new_password();
	}
	
	$('.gift-ticket').click(function(e) {
		e.preventDefault();
		
		var $this = $(this),
			sale_id = $this.attr('data-id');
		
		$('#sale_id').val(sale_id);
		$('#gift').bPopup();
	});
	
	
	$('#support').click(function(e) {
		e.preventDefault();
		
		$('#support-frame').bPopup();
	});
	
	$('#support-frame .post').click(function(e) {
		e.preventDefault();
		
		$.post($(this).closest('form').attr('action'), $(this).closest('form').serializeArray(), function(response) {		
			if(response.status == 'success') {
				$('#support-frame').find('.form').hide();
				$('#support-frame').find('.success').show();
			}
		});
	});
	
	$('.chromeframe').click(function() {
		$(this).remove();
	});
	
	$('#show_agreements').click(function(e) {
		e.preventDefault();
		$('#sales_agreements').bPopup({
			position: ['auto', 20]
		});
	});
	
	$('#agree').change(function() {
		if($(this).attr('checked') == 'checked')
		{
			$('.green.big').removeClass('disabled');
			$('.green.big').addClass('submit');
		}
		else
		{
			$('.green.big').addClass('disabled');
			$('.green.big').removeClass('submit');
		}
	});
	
	$('#show_savecard').click(function(e) {
		e.preventDefault();
		$('#save_card_info').bPopup();
	});
	
	$('#show_account_form').click(function(e) {
		e.preventDefault();
		
		$(this).closest('.inner-shelf').animate({
			'marginLeft'	: 	'-1140px'
		}, 500);
		
		$('#orgnumber').focus();
	});
	
	$('#orgnumber').keyup(function() {
		var length = $(this).val().length,
			url = $(this).attr('data-id'),
			val = $(this).val();
		
		if(length != 9)
		{
			$('#company_name').text('');
			$('#company_name').closest('tr').find('.button').removeClass('submit').addClass('disabled');
			return false;
		}
		
		$.get(url, {orgnr: val}, function(response) {
			if(response == 'false')
			{
				$('#company_name').text('Ingen treff. Prøv på nytt');
				$('#company_name').closest('tr').find('.button').removeClass('submit').addClass('disabled');
				return false;
			}
			
			$('#company_name').text(response.navn);
			$('#company_name').closest('tr').find('.button').addClass('submit').removeClass('disabled');
		});
	});
	

	$('#login-button').click(function() {
		open_loginform();
	});
	
	$('.get-tikkio').click(function() {
		open_registerform();
	});
	
	$('#login-elements .close').click(function() {
		$('#main-navigation').show();
		$('#login-elements').hide();
		$('#login-overlay').hide();
		$('#logo').removeClass('white');
	});
	
	$('#sign-up-overlay .close, #sign-up-overlay #cancel, #cancel_whats_next, #black-overlay, #whats_next .close, #forgot_password .close, #forgot_new_password .close').click(function() {
		$('#sign-up-overlay, #whats_next, #black-overlay,  #forgot_password').hide();
	});
	
	$('.quantity-picker a').click(function(e) {
		e.preventDefault();
		
		var $this = $(this),
			qty = parseInt($this.text()),
			ticket_id = $this.closest('.ticket-wrapper').attr('data-id'),
			url = $('#base_url').val() + '/cart/reserve-ticket',
			slug = $('#tickets-for-sale').closest('form').find('input[name="slug"]').val();
		
		if($this.hasClass('selected'))
		{
			$this.removeClass('selected');
			$.get($('#base_url').val() + '/cart/remove-ticket', {ticket_id: ticket_id, slug: slug}, function(result) {

				if(result.success == 'true')
				{
					update_cart(result.total_items, result.sum);
					return true;
				}
			});
			return false;
		}
		
		$.get($('#base_url').val() + '/cart/reserve-ticket', {ticket_id: ticket_id, quantity: qty, slug: slug}, function(result) {

			if(result.success == 'true')
			{
				update_cart(result.total_items, result.sum);
				display_cart_notification($(this));
				$('.loader').hide();
				return true;
			}
		});
		
		$this.closest('.quantity-picker').find('a').removeClass('selected');
		
		$this.addClass('selected');
	});
	

	$('.block .action').click(function(){
		$('.block').removeClass('flip');
		$(this).closest('.block').addClass('flip');
		
	});
	$('.block .go-back').click(function(e){
		$(this).closest('.block').removeClass('flip');
		e.preventDefault();
	});
	
	$('.back .choose-color').change(function(e) {
		var	target = $(this).val();

		$(this).closest('.back').find('.mg-dropdowns').hide();
		$(this).closest('.back').find('.' + target + "-sizes").show();
	});
	
	
	
	$('#remove_lines').click(function(e) {
		e.preventDefault();
		$('#cart-action').val('remove');
		$(this).closest('form').submit();
	});
	
	$('#update_lines').click(function(e) {
		e.preventDefault();
		$('#cart-action').val('update');
		$(this).closest('form').submit();
	});
	
	$('#finalize-buttons .submit').click(function(e) {
		e.preventDefault();
		$('#cart-action').val('checkout');
		$(this).closest('form').submit();
	});
	
	
	$('form[name="recover_password"]').submit(function(e) {
		e.preventDefault();
		
		var $form = $(this),
			src = $form.attr('action'),
			fields = $form.serializeArray();

		$.post(src, fields, function(result) {

			if(result.success == true)
			{
				$('.password-not-reseted').hide();
				$('.password-reseted').show();
				return true;
			}
			
			$('.ajax_error').html(result.error);
		});
	});

	$('form[name="send_gift"]').submit(function(e) {
		e.preventDefault();
		
		var $form = $(this),
			src = $form.attr('action'),
			fields = $form.serializeArray();
			
		
		$.post(src, fields, function(result) {
			the_result = $.parseJSON(result);
			
			if(the_result.success == 'true')
			{
				$('#gift, .bModal').hide();
				$('#sale_' + $('#sale_id').val()).removeClass('flip');
				$('#sale_' + $('#sale_id').val()).append('\
					<div class="gift-overlay">\
						<div class="gift-icon"></div>\
						<div class="gift-overlay-header">Ikke innløst</div>\
						<div class="gift-overlay-name">'+ $form.find('#email').val() +'</div>\
						<a href="" class="button">Avbryt</a>\
					</div>');
				
				return true;
			}
			
			$('.ajax_error').html(the_result.error);
		});
	});
	
	$('#new-password').click(function() {
		$('#new-password-wrapper').toggle();
	});
		
	
	$('.lines').click(function(e) {
		e.preventDefault();
		
		var trans_id = $(this).attr('data-id');
		

		$('.details-' + trans_id).toggle();
	});

	$('.submit').append('<span class="loader"></span>');

	$('.submit').live('click', function(e) {
		e.preventDefault();
		
		var $this = $(this),
			$form = $this.closest('form');
			
		if($this.hasClass('submitted')) return false;

		$this.addClass('submitted');
		$this.find('.loader').show();
	
		if($form.hasClass('ajax'))
		{
			var src = $form.attr('action'),
				fields = $form.serializeArray();
			
			fields.push({'name': 'ajax', 'value' : 'true'});
			
			$.post(src, fields, function(result) {
				
				if(result.success == 'true')
				{
					update_cart(result.total_items, result.sum);
					display_cart_notification($form);
					$this.removeClass('submitted');
					$('.loader').hide();
					return true;
				}
			});
		}
		else
		{
			$(this).closest('form').submit();
		}
	});
	

	
	function update_cart(items, sum)
	{
		var $cart = $('#header-cart');
		
		if(items > 1)
		{
			var text = ' varer,';
		}
		else
		{
			var text = ' vare,';
		}
		
		$cart.find('.num-items').text(items + text);
		$cart.find('.sum').html('<sup>kr</sup>' + sum);
	}

	
});