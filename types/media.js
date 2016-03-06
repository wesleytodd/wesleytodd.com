import path from 'path';
import {FileType} from 'rufio';
import mediaMeta from 'rufio-filter-mediameta';

export class Media extends FileType {
	constructor () {
		super('media', {
			baseDir: path.resolve(__dirname, '..'),
			directory: 'content/media',
			itemRoute: '/media/:pathSegments*',
			excludePattern: ['!**/*.psd', '!**/_*'],
			metaFilters: [mediaMeta()]
		});
	}

}
