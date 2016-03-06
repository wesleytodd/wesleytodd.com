import path from 'path';
import {FileType} from 'rufio';
import mediaMeta from 'rufio-filter-mediameta';

export class Images extends FileType {
	constructor () {
		super('images', {
			baseDir: path.resolve(__dirname, '..'),
			directory: 'assets/images',
			itemRoute: '/assets/images/:pathSegments*',
			metaFilters: [mediaMeta()]
		});
	}

}
