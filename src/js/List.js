import { App } from './App';
import Header from '../components/header';
import Footer from '../components/footer'
import Tab from '../components/tab'
import ShowBoard from '../components/show_board'

import tools from '../utils/tools';

class List extends App {
  constructor () {
    super({
      swiper: true,
      phone: true,
      field: true
    });
    this.keyword = tools.getUrlQueryValue('keyword');
  }

  render () {
    const tab = new Tab(this.$app, this.cache.phoneDatas, this.cache.fieldDatas)
    new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();
    tab.init()
    new ShowBoard(this.$app, tab.filterDatas(this.cache.phoneDatas, 'all', this.keyword)).init()
    new Footer(this.$app)
    $('body').prepend(this.$app);
  }

}

new List()