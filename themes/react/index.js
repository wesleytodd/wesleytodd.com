var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var React = require('react');
var ReactDom = require('react-dom/server');
var Theme = require('rufio').Theme;

// Templates
var IndexTemplate = React.createFactory(require('./templates/index.jsx'));
var PageTemplate = React.createFactory(require('./templates/page.jsx'));
var PostTemplate = React.createFactory(require('./templates/post.jsx'));

export default class ReactTheme extends Theme {
	constructor () {
		super();

		// Load up the base html file
		this.tmpl = ejs.compile(fs.readFileSync(path.join(__dirname, 'index.html'), {
			encoding: 'utf8'
		}));
	}
	renderContentItem (item, done) {
		try {
			var t = this.tmpl({
				site: item.site,
				item: item,
				content: ReactDom.renderToString(PageTemplate({
					site: item.site,
					page: item
				}))
			});
		} catch (e) {
			console.log(e.stack);
		}
		done(null, t);
	}
}
