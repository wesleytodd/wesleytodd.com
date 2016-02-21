var rufio = require('rufio');
var yamlMeta = require('rufio-filter-yamlmeta');
var mediaMeta = require('rufio-filter-mediameta');
var markdown = require('rufio-filter-markdown');
var sass = require('rufio-filter-sass');
var mustache = require('rufio-filter-mustache');
var browserify = require('rufio-filter-browserify');

module.exports = new rufio.Site({
	baseDir: __dirname,
	title: 'John Wesley Todd',
	hostname: 'wesleytodd.com',
	tagline: 'A javascript application developer',
	titleFormat: '{{item.title}} - {{site.title}} - {{site.tagline}}',
	types: [
		new rufio.FileType('pages', {
			baseDir: __dirname,
			directory: 'content/pages',
			itemRoute: '/:slug:ext',
			mime: 'text/html',
			ext: '.html',
			filters: [yamlMeta(), mustache()]
		}),
		new rufio.FileType('posts', {
			baseDir: __dirname,
			directory: 'content/posts',
			route: '/posts',
			itemRoute: '/posts/:year/:month/:slug.html',
			mime: 'text/html',
			filters: [yamlMeta(), mustache(), markdown()],
			indexBy: [{
				keys: ['year'],
				route: '/posts/:year'
			}, {
				keys: ['year', 'month'],
				route: '/posts/:year/:month'
			}]
		}),
		new rufio.FileType('projects', {
			baseDir: __dirname,
			directory: 'content/projects',
			itemRoute: '/projects/:slug:ext',
			ext: '.html',
			filters: [yamlMeta(), mustache(), markdown()]
		}),
		new rufio.FileType('media', {
			baseDir: __dirname,
			directory: 'content/media',
			itemRoute: '/media/:pathSegments*',
			excludePattern: ['!**/*.psd', '!**/_*'],
			filters: [mediaMeta()]
		}),
		new rufio.FileType('images', {
			baseDir: __dirname,
			directory: 'assets/images',
			itemRoute: '/assets/images/:pathSegments*',
			filters: [mediaMeta()]
		}),
		new rufio.FileType('css', {
			baseDir: __dirname,
			directory: 'assets/scss',
			itemRoute: '/assets/css/:pathSegments*',
			mime: 'text/css',
			ext: '.css',
			filters: [mediaMeta(), sass()]
		}),
		new rufio.FileType('images', {
			baseDir: __dirname,
			directory: 'assets/js',
			itemRoute: '/assets/js/:pathSegments*',
			filters: [mediaMeta(), browserify()]
		})
	]
});
