import { App } from './App';
import Header from '../components/header';
import Footer from '../components/footer'
import DetailBoard from '../components/detail_board'
import tools from '../utils/tools';
import { DetailModel } from '../models/detail';

class Detail extends App {
  constructor () {
    super({
      swiper: true,
      phone: true,
      field: true
    });

    this.phoneId = tools.getUrlQueryValue('id');
  }

  async render () {
    const data = await this.getPhoneData(this.phoneId)
    new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();
    new DetailBoard(this.$app, data).init()
    new Footer(this.$app)
    $('body').prepend(this.$app);
  }

  getPhoneData (id) {
    const detailModel = new DetailModel();
    return detailModel.getPhoneInfo(id);
  }

}

new Detail()