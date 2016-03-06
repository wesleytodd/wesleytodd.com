require('babel-register');
var express = require('express');
var runnable = require('runnable');
var rufioServer = require('rufio-server');
var site = require('./site').site;
var theme = require('./theme').default;

var main = module.exports = runnable(function main (opts, done) {
	// Create app
	var app = express();

	site.on('init', function () {
		site.load(function (err) {
			if (err) {
				return done(err);
			}

			// Load up rufio server for the html
			app.use(rufioServer(site, theme));

			// Setup the api server
			app.use('/api', rufioServer(site, {
				mime: 'application/json'
			}));

			// Handle errors and 404's
			app.use(function (err, res, res, next) {
				if (err) {
					if (err.message === 'res.locals.item is required') {
						res.status(404);
						res.send('item not found');
						return;
					}
					next(err);
				}
			});

			// Done setting up the app
			done(null, app);
		});
	});
}, [{
	// Default options
	port: 4000
}, function (err, app) {
	if (err) {
		console.error('err');
		process.exit(1);
	}

	// Start server
	var server = app.listen(4000, function () {
		console.log('Listening on ' + server.address().port);
	});
}]);
