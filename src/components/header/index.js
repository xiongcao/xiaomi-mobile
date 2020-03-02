import tpl from './index.tpl';
import './index.scss';

import { Logo } from './logo';

import tools from '../../utils/tools';

export class Header {
  constructor (el, fieldDatas, phoneDatas) {
    this.name = 'header';
    this.$el = el;
    this.fieldDatas = fieldDatas;
    this.phoneDatas = phoneDatas;
    this.logo = new Logo();
  }

  async init () {
    await this.render();
    // this.bindEvent();
  }

  async render () {
    await this.$el.append(tools.tplReplace(tpl(), {
      logo: this.logo.tpl()
    }))
  }
}