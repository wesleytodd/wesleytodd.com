var rufio = require('rufio');

module.exports = function(pages, classes) {

	// Sort in reverse cron order
	pages.sort(function(a, b) {
		return b.meta.date - a.meta.date
	});

	var out = '<nav class="' + classes + '"><ul>';
	for (var i in pages) {
		if (rufio.config.get().ENVIRONMENT == 'dev' || pages[i].meta.status == 'Published') {
			out += '<li><a href="' + pages[i].permalink + '">' + pages[i].meta.title + '</a></li>';
		}
	}
	out += '</ul></nav>';
	return out;
};
