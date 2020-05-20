import { App } from './App';
import Header from '../components/header';
import carousel from '../components/carousel';
class Index extends App {
  constructor () {
    super({
      swiper: true,
      phone: true,
      field: true
    });
  }

  render () {
    new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();
    new carousel(this.$app, this.cache.swiperDatas).init();
    $('body').prepend(this.$app);
  }
}
new Index();