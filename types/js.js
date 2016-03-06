import path from 'path';
import {FileType} from 'rufio';
import mediaMeta from 'rufio-filter-mediameta';
import browserify from 'rufio-filter-browserify';

export class Js extends FileType {
	constructor () {
		super('javascript', {
			baseDir: path.resolve(__dirname, '..'),
			directory: 'assets/js',
			itemRoute: '/assets/js/:pathSegments*',
			mime: 'application/javascript',
			metaFilters: [mediaMeta()],
			filters: [browserify()]
		});
	}

}
