import { App } from './App';
import Header from '../components/header';
import Carousel from '../components/carousel';
import BoardTitle from '../components/board_title'
import ShowBoard from '../components/show_board'
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
    new Carousel(this.$app, this.cache.swiperDatas).init();
    new BoardTitle(this.$app, '手机上新');
    new ShowBoard(this.$app, this.handlePhonedatas('new'))
    new BoardTitle(this.$app, '超值手机');
    new ShowBoard(this.$app, this.handlePhonedatas('most_value'))
    new BoardTitle(this.$app, '官方推荐');
    new ShowBoard(this.$app, this.handlePhonedatas('recom'))
    $('body').prepend(this.$app);
  }

  handlePhonedatas (field) {
    return this.cache.phoneDatas.filter(item => {
      switch (field) {
        case "most_value":
          return item.most_value == 1
        break;
        case "new":
          return item.new == 1
        break;
        case "recom":
          return item.recom == 1
        break;
        default:
          break;
      }
    })
  }
}
new Index();