var rufio = require('rufio'),
	rss = require('rss');

rufio.onHook('afterBuild', function(compiledData, done) {

	console.log(compiledData);
	done();
	
});
