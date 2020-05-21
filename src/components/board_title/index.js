import tpl from './index.tpl';

import './index.scss';

export default class BoardTitle {
  constructor (el, title) {
    this.name = "board_title";
    this.$el = el;
    this.title = title;
    this.render()
  }

  render () {
    this.$el.append(tpl({ title: this.title }))
  }
}