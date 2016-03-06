import path from 'path';
import fs from 'fs';
import through2 from 'through2';
import mustache from 'mustache';
import pluralize from 'pluralize';
import React from 'react';
import ReactDom from 'react-dom/server';
import stringify from 'json-stringify-safe';
import {Type, Item, Collection} from 'rufio';

// Templates
var IndexTemplate = React.createFactory(require('./components/index.jsx'));
var PageTemplate = React.createFactory(require('./components/page.jsx'));
var PostTemplate = React.createFactory(require('./components/post.jsx'));
var HomeTemplate = React.createFactory(require('./components/home.jsx'));

// Pre-parse the mustache template
var indexTmpl = fs.readFileSync(path.join(__dirname, 'index.html'), {
	encoding: 'utf8'
});
mustache.parse(indexTmpl);

export default function (site) {
	return through2.obj(function (obj, enc, _done) {
		var done = function themeDone (err, content) {
			if (content && !Buffer.isBuffer(content)) {
				content = new Buffer(content);
			}
			_done(err, content);
		};

		if (obj instanceof Collection) {
			return done(null, stringify(obj, null, '', function () {}));
		}
		if (['pages', 'posts', 'projects'].indexOf(obj.type.name) !== -1) {
			return renderTemplate(obj, done);
		}
		if (['css', 'javascript'].indexOf(obj.type.name) !== -1) {
			return done(null, obj.content);
		}
		done(null, obj.rawContent);
	});

	function renderTemplate (item, done) {
		var Component;
		if (item.meta.template) {
			switch (item.meta.template) {
			case 'home':
				Component = HomeTemplate;
				break;

			}
		} else {
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
		}

		// Singlarize the type name
		var type = pluralize.singular(item.type.name);

		// Render the template
		try {
			var t = mustache.render(indexTmpl, Object.assign({
				site: site
			}, {
				[type]: item,
				content: ReactDom.renderToString(Component({
					site: site,
					[type]: item
				}))
			}));
		} catch (e) {
			return done(e);
		}
		done(null, t);
	}
}
