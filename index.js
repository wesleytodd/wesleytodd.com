require('babel-register');
var express = require('express');
var runnable = require('runnable');
var rufioServer = require('rufio-server');
var site = require('./site');
var theme = require('./theme').default;

var main = module.exports = runnable(function main (opts, done) {
	// Create app
	var app = express();

	// Load up rufio
	app.use(rufioServer(site, theme));

	// Done setting up the app
	done(null, app);
}, [{
	// Default options
	port: 4000
}, function (err, app) {
	// Start server
	var server = app.listen(4000, function () {
		console.log('Listening on ' + server.address().port);
	});
}]);
