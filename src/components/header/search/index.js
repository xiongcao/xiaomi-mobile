import tpl from './index.tpl';
import './index.scss';
import tools from '../../../utils/tools';

class Search {
  constructor() {
    this.name = 'search';
    this.tpl = tpl;
  }

  searchPhone() {
    const $searchForm = $('#J_searchForm'),
          $searchInput = $('#J_keyword');

    const keyword = tools.trimSpaces($searchInput.val()),
          active = $searchForm.prop('action'),
          keywordLen = keyword.length;
    if (keywordLen > 0) {
      window.open(active + '?keyword=' + keyword);
    }
  }

}

export {
  Search
}