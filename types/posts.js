import path from 'path';
import {FileType} from 'rufio';
import yamlMeta from 'rufio-filter-yamlmeta';
import mustache from 'rufio-filter-mustache';
import markdown from 'rufio-filter-markdown';

export class Posts extends FileType {
	constructor () {
		super('posts', {
			baseDir: path.resolve(__dirname, '..'),
			directory: 'content/posts',
			route: '/posts',
			itemRoute: '/posts/:year/:month/:slug.html',
			mime: 'text/html',
			metaFilters: [yamlMeta()],
			filters: [mustache(), markdown()],
			indexBy: [{
				keys: ['year'],
				route: '/posts/:year'
			}, {
				keys: ['year', 'month'],
				route: '/posts/:year/:month'
			}]
		});
	}

}
