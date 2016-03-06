import path from 'path';
import {FileType} from 'rufio';
import through2 from 'through2';
import GithubApi from 'github';
import yamlMeta from 'rufio-filter-yamlmeta';
import mustache from 'rufio-filter-mustache';
import markdown from 'rufio-filter-markdown';

var github = new GithubApi({
	version: '3.0.0'
});

export class Projects extends FileType {
	constructor () {
		super('projects', {
			baseDir: path.resolve(__dirname, '..'),
			directory: 'content/projects',
			itemRoute: '/projects/:slug:ext',
			mime: 'text/html',
			ext: '.html',
			metaFilters: [yamlMeta(), function (item) {
				item.githubRepo = null;

				return through2.obj(function (chunk, enc, done) {
					done(null, chunk);
				}, (done) => {
					// Get the readme
					github.repos.get({
						user: item.meta.githubUser,
						repo: item.meta.githubRepo
					}, function (err, repo) {
						if (err) {
							return done(err);
						}
						item.githubRepo = repo;
						done();
					});
				});
			}],
			filters: [mustache(), markdown()]
		});
	}
}
