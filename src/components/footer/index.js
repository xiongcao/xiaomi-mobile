import tpl from './index.tpl';
import './index.scss';

export default class Footer {
  constructor (el) {
  	this.name = 'footer';
    this.$el = el;

    this.render();
  }

  render () {
    this.$el.append(tpl());
  }

}
