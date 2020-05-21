import boardTpl from './tpl/board.tpl';
import itemTpl from './tpl/item.tpl';
import NoDataTip from '../no_data_tip'
import './index.scss'

export default class ShowBoard {
  constructor(el, phoneDatas) {
    this.name = 'show_board'
    this.$el = el;
    this.phoneDatas = phoneDatas

    this.render()
  }

  render() {
    this.$el.append(boardTpl({
      list: this.handleItmeTpl() || new NoDataTip().tpl('未搜索到相关数据')
    }))
  }

  handleItmeTpl () {
    let list = ''
    this.phoneDatas.forEach((item, i) => {
      console.log(item.slogan.split('，'))
      list += itemTpl({
        id: item.id,
        isFirst: i % 5 === 0 ? 'first' : '',
        pic: JSON.parse(item.pics)['0'][0][0],
        phone_name: item.phone_name,
        slogan: item.slogan.substr(0, 10),
        default_price: item.default_price
      })
    });
    return list
  }
}