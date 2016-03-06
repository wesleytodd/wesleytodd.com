import path from 'path';
import {FileType} from 'rufio';
import mediaMeta from 'rufio-filter-mediameta';
import sass from 'rufio-filter-sass';

export class Css extends FileType {
	constructor () {
		super('css', {
			baseDir: path.resolve(__dirname, '..'),
			directory: 'assets/scss',
			itemRoute: '/assets/css/:pathSegments*',
			mime: 'text/css',
			ext: '.css',
			metaFilters: [mediaMeta()],
			filters: [sass()]
		});
	}

}
