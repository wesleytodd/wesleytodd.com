module.exports = function(handlebars) {
	
	handlebars.registerHelper('navList', function(pages, num) {
		if (typeof num !== 'number') {
			num = 10;
		}
		var out = '<ul>',
			count = 0;
		for (var i in pages) {
			if (count < num) {
				out += '<li><a href="/' + pages[i].permalink + '">' + pages[i].meta.title + '</a></li>';
				count++;
			}
		}
		out += '</ul>';
		return new handlebars.SafeString(out);
	});

};
