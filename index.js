require('babel-register')();
var express = require('express');
var runnable = require('runnable');
var rufio = require('rufio');
var rufioServer = require('rufio-server');
var rufioConfig = require('./rufio.json');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var main = module.exports = runnable(function main (opts) {
	// Create app
	var app = express();

	var site = new rufio.Site(Object.assign({
		baseDir: __dirname
	}, rufioConfig));

	// Load up rufio
	app.use(rufioServer(site));

	// Start server
	var server = app.listen(opts.port, function () {
		console.log('Listening on ' + server.address().port);
	});

	return server;
}, [{
	// Default options
	port: 4000
}]);
