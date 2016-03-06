import {Site} from 'rufio';
import yamlMeta from 'rufio-filter-yamlmeta';
import mediaMeta from 'rufio-filter-mediameta';
import markdown from 'rufio-filter-markdown';
import sass from 'rufio-filter-sass';
import mustache from 'rufio-filter-mustache';
import browserify from 'rufio-filter-browserify';

// Types
import {Pages} from './types/pages';
import {Posts} from './types/posts';
import {Projects} from './types/projects';
import {Media} from './types/media';
import {Images} from './types/images';
import {Css} from './types/css';
import {Js} from './types/js';

export const site = new Site({
	baseDir: __dirname,
	title: 'John Wesley Todd',
	hostname: 'wesleytodd.com',
	tagline: 'A javascript application developer',
	titleFormat: '{{item.title}} - {{site.title}} - {{site.tagline}}',
	types: [
		new Posts(),
		new Projects(),
		new Media(),
		new Images(),
		new Css(),
		new Js(),
		new Pages()
	]
});
