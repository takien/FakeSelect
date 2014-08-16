/*!
 * fakeSelect v0.1
 *
 * Copyright 2014
 * http://takien.com
 * 
 * Licensed under the MIT License
 * http://en.wikipedia.org/wiki/MIT_License
 *
 */
(function($) {
	$.fn.fakeSelect = function(customOptions) {
		var o = $.extend({}, $.fn.fakeSelect.defaultOptions, customOptions);

		return this.each(function(index) {
			
		var _select = $(this),
			 select_id     = (_select.attr('id') == undefined) ? 'fake-select-'+index : _select.attr('id'),
			 selected_text = _select.find('option[value="'+_select.val()+'"]').text() || _select.find('option').first().text(),
			 o = $.extend({}, o, _select.data()),
			 height, style_height	 = (height = parseInt(o.height)) ? ' style="max-height: ' + height + 'px; overflow-x: hidden;"' : '';
			
		
			_select.wrap('<div class="fake-select-wrap" style="display:inline-block;position:relative"/>');
			_select.before('<span class="fake-select-mask" id="'+select_id+'-mask"><button type="button" class="btn '+o.btnStyle+' '+o.btnSize+' dropdown-toggle" data-toggle="dropdown"> <span class="fake-selected">'+selected_text+'</span> <span class="caret"></span></button><ul class="dropdown-menu" ' + style_height + '></ul></span>');
			
			var select_mask  = _select.prev('.fake-select-mask');
		
			_select.find('option').each(function() {
				var text = $(this).text();
				select_mask.find('.dropdown-menu').append('<li><a data-val="'+$(this).val()+'" href="#">'+text+'</a></li>');
			});
			
			
			select_mask.attr('title',(_select.attr('title') || ''));
			select_mask.find('.dropdown-menu li a').each(function() {
				$(this).click(function(e){
					_select.val($(this).data('val')).change();
					select_mask.find('.fake-selected').text($(this).text());
					e.preventDefault();
				});
			});
			_select.hide();
			
			_select.on('change',function() {
				select_mask.find('.fake-selected').text(_select.find('option[value="'+_select.val()+'"]').text());
			});
		}); /* end loop*/

	};
 
	$.fn.fakeSelect.defaultOptions = {
		btnSize : '',
		btnStyle: 'btn-default'  
	};
})(jQuery);