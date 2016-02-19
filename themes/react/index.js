import path from 'path';
import fs from 'fs';
import through2 from 'through2';
import mustache from 'mustache';
import pluralize from 'pluralize';
import React from 'react';
import ReactDom from 'react-dom/server';
import {Type, Item} from 'rufio';

// Templates
var IndexTemplate = React.createFactory(require('./templates/index.jsx'));
var PageTemplate = React.createFactory(require('./templates/page.jsx'));
var PostTemplate = React.createFactory(require('./templates/post.jsx'));

export default function (site) {
	var indexTmpl = fs.readFileSync(path.join(__dirname, 'index.html'), {
		encoding: 'utf8'
	});
	mustache.parse(indexTmpl);

	return through2.obj(function (item, enc, done) {

		if (item.type.name !== 'media') {
			var Component;
			switch (item.type.name) {
				case 'pages':
					Component = PageTemplate;
					break;
				case 'posts':
					Component = PostTemplate;
					break;
			}

			// Singlarize the type name
			var type = pluralize.singular(item.type.name);

			// Render the template
			try {
				var renderedTemplate = mustache.render(indexTmpl, Object.assign({
					site: site
				}, {
					[type]: item,
					content: ReactDom.renderToString(Component({
						site: site,
						[type]: item
					}))
				}));
			} catch (e) {
				return done(new Error('Error rendering template: \n' + e.stack));
			}

			this.push(renderedTemplate);
			return done();
		}

		//console.log(item.filepath, item.mime);
		this.push(item.rawContent);
		done();
	});
}

/*
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
var React = require('react');
var ReactDom = require('react-dom/server');
var Theme = require('rufio').Theme;
var pluralize = require('pluralize');

// Templates
var IndexTemplate = React.createFactory(require('./templates/index.jsx'));
var PageTemplate = React.createFactory(require('./templates/page.jsx'));
var PostTemplate = React.createFactory(require('./templates/post.jsx'));

export default class ReactTheme extends Theme {
	constructor (site) {
		super(site);

		// Load up the base html file and parse the template
		this.indexTmpl = fs.readFileSync(path.join(__dirname, 'index.html'), {
			encoding: 'utf8'
		});
		mustache.parse(this.indexTmpl);
	}

	render (data = {}, done) {
		try {
			done(null, mustache.render(this.indexTmpl, Object.assign({
				site: this.site
			}, data)));
		} catch (e) {
			done(e);
		}
	}

	renderContentItem (item, done) {
		var Component;
		switch (item.type.name) {
			case 'pages':
				Component = PageTemplate;
				break;
			case 'posts':
				Component = PostTemplate;
				break;
		}

		var type = pluralize.singular(item.type.name);
		return this.render({
			[type]: item,
			content: ReactDom.renderToString(Component({
				site: this.site,
				[type]: item
			}))
		}, done);
	}

	renderContentIndex (items, done) {
		return this.render({
			content: ReactDom.renderToString(IndexTemplate({
				site: this.site,
				items: items
			}))
		}, done);
	}
}
*/
