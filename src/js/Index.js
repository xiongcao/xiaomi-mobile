import { App } from './App';
import Header from '../components/header';
import Carousel from '../components/carousel';
import BoardTitle from '../components/board_title'
import ShowBoard from '../components/show_board'
import Footer from '../components/footer'
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
    new ShowBoard(this.$app, this.handlePhonedatas('new')).init()
    new BoardTitle(this.$app, '超值手机');
    new ShowBoard(this.$app, this.handlePhonedatas('most_value')).init()
    new BoardTitle(this.$app, '官方推荐');
    new ShowBoard(this.$app, this.handlePhonedatas('recom')).init()
    new Footer(this.$app)
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