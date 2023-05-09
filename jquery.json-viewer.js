/**
 * jQuery json-viewer
 * @author: Alexandre Bodelot <alexandre.bodelot@gmail.com>
 */
(function($){

	/**
	 * Check if arg is either an array with at least 1 element, or a dict with at least 1 key
	 * @return boolean
	 */
	function is_collapsable(arg)
	{
		return arg instanceof Object && Object.keys(arg).length > 0;
	}

	/**
	 * Transform json object into html representation
	 * @return string
	 */
	function getType(json) {
		if (typeof json === 'string') {
			return '<span class="node ndstr"></span>';
		}
		else if (typeof json === 'number') {
			return '<span class="node ndnum"></span>';
		}
		else if (typeof json === 'boolean') {
			return '<span class="node ndbool"></span>';
		}
		else if (json === null) {
			return '<span class="node ndnull"></span>';
		}
		else if (json instanceof Array) {
			return '<span class="node ndarr"></span>';
		}
		else if (typeof json === 'object') {
			return '<span class="node ndobj"></span>';
		}
		return '';
	}
	
	function json2html(json)
	{
		html = '';
		if (typeof json === 'string') {
			html += '<span class="json-string">"' + json + '"</span>';
		}
		else if (typeof json === 'number') {
			html += '<span class="json-literal">' + json + '</span>';
		}
		else if (typeof json === 'boolean') {
			html += '<span class="json-literal">' + json + '</span>';
		}
		else if (json === null) {
			html += '<span class="json-literal">null</span>';
		}
		else if (json instanceof Array) {
			if (json.length > 0) {
				html += '[<ol class="json-array">';
				for (var i in json) {
					html += '<li>'
					// Add toggle button if item is collapsable
					if (is_collapsable(json[i]))
						html += '<a href class="json-toggle"></a>';

					html += json2html(json[i]);
					// Add comma if item is not last
					if (i < json.length - 1)
						html += ',';
					html += '</li>';
				}
				html += '</ol>]';
			}
			else {
				html += '[]';
			}
		}
		else if (typeof json === 'object') {
			var key_count = Object.keys(json).length;
			if (key_count > 0) {
				html += '{<ul class="json-dict">';
				for (var i in json) {
					if (json.hasOwnProperty(i)) {
						html += '<li>';
						// Add toggle button if item is collapsable
						if (is_collapsable(json[i]))
							html += '<a href class="json-toggle"></a>';

						html += getType(json[i]) + i + ': ' + json2html(json[i]);
						// Add comma if item is not last
						if (--key_count > 0)
							html += ',';
						html += '</li>';
					}
				}
				html += '</ul>}';
			}
			else {
				html += '{}';
			}
		}
		return html;
	}

	/**
	 * jQuery plugin method
	 */
	$.fn.json_viewer = function(json) {
		// jQuery chaining
		return this.each(function() {
			// Transform to HTML
			var html = json2html(json)
			if (is_collapsable(json))
				html = '<a href class="json-toggle"></a>' + html;

			// Insert HTML in target DOM element
			$(this).html(html);

			// Bind click on toggle buttons
			$(this).unbind('click');
			$(this).on('click', 'a.json-toggle', function() {
				var target = $(this).toggleClass('collapsed').siblings('ul.json-dict, ol.json-array');
				target.toggle();
				if (target.is(':visible')) {
					target.siblings('.json-placeholder').remove();
				}
				else {
					var count = target.children('li').length;
					var placeholder = count + (count > 1 ? ' items' : ' item');
					target.after('<a href class="json-placeholder">' + placeholder + '</a>');
				}
				return false;
			});

			// Simulate click on toggle button when placeholder is clicked
			$(this).on('click', 'a.json-placeholder', function() {
				$(this).siblings('a.json-toggle').click();
				return false;
			});
		});
	};
})(jQuery);
