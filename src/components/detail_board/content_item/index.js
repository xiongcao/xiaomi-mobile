import tpl from './index.tpl';
import './index.scss';

export default class ContentItem {
	constructor () {
		this.name = 'contentItem';
	}

	tpl (content, price, pic, name, index) {
    return tpl({
      isCurrent: index === 0 ? 'content-item current' : 'content-item',
      content,
      pic,
      name,
      dPrice: price,
      price: price ? price + '元' : ''
    });
	}
}