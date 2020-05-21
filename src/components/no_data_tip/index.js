import tpl from './index.tpl';
import './index.scss';

import tools from '../../utils/tools';

export default class NoDataTip {
  constructor () {
    this.name = 'noDataTip';
  }

  tpl (text) {
  	return tpl({ text })
  }
}
