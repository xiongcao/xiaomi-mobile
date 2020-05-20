import navMenuTpl from './tpl/nav_menu.tpl';
import navMenuItemTpl from './tpl/nav_menu_item.tpl';
import './index.scss';


class NavMenu {
  constructor () {
    this.name = 'navMenu';
    this.tpl = navMenuTpl;
  }
  appendMenuCards (data) {
    let list = '';
    data.forEach((item, idx) => {
    	if (idx < 7) {
        list += navMenuItemTpl({
          id: item.id,
	        pic: $.parseJSON(item.pics)[0][0][0],
	        phone_name: item.phone_name,
	        default_price: item.default_price,
	        isFirst: idx === 0 ? 'first' : ''
	      });
    	}
    });
    return list;
  }
}

export { NavMenu }