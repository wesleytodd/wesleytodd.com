var rufio = require('rufio'),
	rss = require('rss');

console.log('HERE');
rufio.onHook('afterBuild', function(compiledData, done) {

	console.log('RSS Feed');
	console.log(compiledData);
	done();
	
});
