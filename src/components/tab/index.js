import wrapperTpl from './tpl/wrapper.tpl'
import itemTpl from './tpl/item.tpl'
import ShowBoard from '../../components/show_board';
import './index.scss'
import tools from '../../utils/tools';

export default class Tab {
  constructor (el, phoneDatas, fieldDatas) {
    this.name = 'tab';
    this.$el = el;
    this.phoneDatas = phoneDatas;
    this.fieldDatas = fieldDatas;
    this.cache = {};
  }

  async init () {
    await this.render()
    this.bindEvent()
  }

  async render () {
    await this.$el.append(wrapperTpl({ list: this.handleTabItemTpl() }))
  }

  bindEvent () {
    const $tab = $('.J_tab'),
          $board = $('.J_board'),
          $searchInput = $('#J_search'),
          oShowBoard = new ShowBoard();
    $tab.on('click', '.tab-item', { $board, oShowBoard }, $.proxy(this.tabClick, this))
    $searchInput.on('input', { $board, oShowBoard, $tab }, tools.throttle($.proxy(this.inputSearch, this), 1000));
  }

  handleTabItemTpl () {
    let list = '';
    this.fieldDatas.forEach((item, i) => {
      list += itemTpl({
        field: item.field,
        series_name: item.series_name
      })
    });
    return list
  }

  tabClick (e) {
    console.log(e.target)
    const tar = e.target,
          $tar = $(tar),
          $board = e.data.$board,
          oShowBoard = e.data.oShowBoard,
          tagName = tar.tagName.toLowerCase();

    if (tagName === 'a') {
      const field = $tar.attr('data-field');
      this.tabChange($tar);
      this.appendList(field, $board, oShowBoard);
    }
  }

  inputSearch (e) {
    const data = e.data,
          $board = data.$board,
          $tab = data.$tab,
          oShowBoard = data.oShowBoard,
          $tar = $(e.target),
          value = tools.trimSpaces($tar.val()),
          valLen = value.length;
    this.tabChange ($tab.find('.all'));
    if (valLen <= 0) {
      this.appendList('all', $board, oShowBoard);
    } else {
      this.appendList('all', $board, oShowBoard, value);
    }
  }

  tabChange ($target) {
    $target.parent().addClass('current')
           .siblings().removeClass('current');
  }

  appendList (field, $board, oShowBoard, keyword) {
    if (keyword) {
      let data = this.filterDatas(this.phoneDatas, field, keyword),
          dataLen = data.length;
      
      if (dataLen === 0) {
        $board.html(this.noDataTip.tpl('未搜索到相关数据'));
      } else {
        $board.html(oShowBoard.handleItmeTpl(data));
      }
    } else {
      if (!this.cache[field]) {
        this.cache[field] = oShowBoard.handleItmeTpl(this.filterDatas(this.phoneDatas, field));
      } 
      $board.html(this.cache[field]);
    }
  }

  filterDatas (datas, field, keyword) {
    return datas.filter((item) => {
      if (keyword) {
         const phone_name = item.phone_name.toLowerCase(),
               slogan = item.slogan.toLowerCase();
         keyword = keyword.toLowerCase();

         return phone_name.includes(keyword) || slogan.includes(keyword);
      } else {
        switch (field) {
          case 'all':
            return true;
          default:
            return item.field === field;
        }
      }
    });
  }

}