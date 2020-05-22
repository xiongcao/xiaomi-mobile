import tpl from './index.tpl';
import './index.scss';

export default class DetailTitle {
	constructor () {
		this.name = 'detailTitle';
	}

	tpl (title) {
    return tpl({ title });
	}
}