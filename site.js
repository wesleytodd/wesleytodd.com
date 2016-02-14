import {Site} from 'rufio';

export class MySite extends Site {}

export default function main (config) {
	return new MySite(config);
}
