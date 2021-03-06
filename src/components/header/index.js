import tpl from './index.tpl';
import './index.scss';
import Logo from './logo';
import Nav from './nav'
import Search from './search'

export default class Header {
  constructor (el, fieldDatas, phoneDatas) {
    this.name = 'header';
    this.$el = el;
    this.fieldDatas = fieldDatas;
    this.phoneDatas = phoneDatas;
    this.logo = new Logo();
    this.nav = new Nav();
    this.search = new Search();
  }

  async init () {
    await this.render();
    this.bindEvent();
  }

  async render () {
    await this.$el.append(tpl({
      logo: this.logo.tpl(),
      nav: this.nav.tpl(this.fieldDatas),
      search: this.search.tpl()
    }))
  }

  bindEvent () {
    const $searchBtn = $('.J_searchBtn'),
          $nav = $('.J_nav');

    $searchBtn.on('click', this.search.searchPhone)
    $nav.on('mouseenter', '.nav-item', {
      phoneDatas: this.phoneDatas,
      nav: this.nav
    }, this.nav.navMenuMouseIn)
  }
}
