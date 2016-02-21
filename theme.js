import path from 'path';
import fs from 'fs';
import through2 from 'through2';
import mustache from 'mustache';
import pluralize from 'pluralize';
import React from 'react';
import ReactDom from 'react-dom/server';
import {Type, Item, Collection} from 'rufio';

// Templates
var IndexTemplate = React.createFactory(require('./components/index.jsx'));
var PageTemplate = React.createFactory(require('./components/page.jsx'));
var PostTemplate = React.createFactory(require('./components/post.jsx'));

// Pre-parse the mustache template
var indexTmpl = fs.readFileSync(path.join(__dirname, 'index.html'), {
	encoding: 'utf8'
});
mustache.parse(indexTmpl);

export default function (site) {
	return through2.obj(function (obj, enc, done) {
		if (obj instanceof Collection) {
			obj.mime = 'applicaion/json';
			return done(null, JSON.stringify(obj));
		}
		if (['pages', 'posts', 'projects'].indexOf(obj.type.name) !== -1) {
			return done(null, renderTemplate(obj));
		}
		if (['css', 'js'].indexOf(obj.type.name) !== -1) {
			return done(null, obj.content);
		}
		done(null, obj.rawContent);
	});

	function renderTemplate (item) {
		var Component;
		switch (item.type.name) {
			case 'pages':
				Component = PageTemplate;
				break;
			case 'posts':
				Component = PostTemplate;
				break;
			default:
				Component = IndexTemplate;
		}

		// Singlarize the type name
		var type = pluralize.singular(item.type.name);

		// Render the template
		return mustache.render(indexTmpl, Object.assign({
			site: site
		}, {
			[type]: item,
			content: ReactDom.renderToString(Component({
				site: site,
				[type]: item
			}))
		}));
	}
}
