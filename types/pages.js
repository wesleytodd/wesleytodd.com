import path from 'path';
import {FileType} from 'rufio';
import yamlMeta from 'rufio-filter-yamlmeta';
import mustache from 'rufio-filter-mustache';

export class Pages extends FileType {
	constructor () {
		super('pages', {
			baseDir: path.resolve(__dirname, '..'),
			directory: 'content/pages',
			itemRoute: '/:slug:ext',
			mime: 'text/html',
			ext: '.html',
			metaFilters: [yamlMeta()],
			filters: [mustache()]
		});
	}

}
