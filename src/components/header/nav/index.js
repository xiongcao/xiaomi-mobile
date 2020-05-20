import navTpl from './tpl/nav.tpl';
import navItemTpl from './tpl/nav_item.tpl';
import './index.scss';

import { NavMenu } from './nav_menu';

class Nav {
  constructor () {
    this.name = 'heanderNav';
    this.navMenu = new NavMenu();
    this.htmlCache = {};
  }

  tpl (data) {
    let list = "";
    data.forEach((item) => {
      list += navItemTpl({
        field: item.field,
        seriesName: item.series_name
      })
    })
    return navTpl({
      navItems: list,
      navMenu: this.navMenu.tpl()
    })
  }

  navMenuMouseIn (e) {
    const phoneDatas = e.data.phoneDatas,
          oNav = e.data.nav
    const field = $(this).attr('data-field'),
          $navMenu = $('.J_navMenu')

    if (!oNav.htmlCache[field]) {
      oNav.htmlCache[field] = oNav.navMenu.appendMenuCards(
        phoneDatas.filter((item) => {
          return item.field === field
        })
      )
    }
    $navMenu.html(oNav.htmlCache[field])
  }

}

export { Nav }