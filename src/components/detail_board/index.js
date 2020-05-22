import tpl from './index.tpl'
import DetailTitle from './detail_title';
import ContentItem from './content_item';
import BtnGroup from './btn_group';

import './index.scss'

export default class DetailBoard {
  constructor (el, phoneData) {
    this.name = 'detail_board';
    this.$el = el
    this.phoneData = phoneData
    console.log(phoneData)
  }

  init () {
    this.initPhoneData()
    this.render()
    this.initUserPhoneData()
    this.bindEvent()
  }

  initPhoneData () {
    const phoneData = this.phoneData;
    this.phoneData.color = $.parseJSON(phoneData.color);
    this.phoneData.version_info = $.parseJSON(phoneData.version_info);
    this.phoneData.pics = $.parseJSON(phoneData.pics);
  }

  initUserPhoneData () {
    const phoneData = this.phoneData,
    versions = phoneData.version_info;

    this.userPhoneInfo = {
      id: phoneData.id,
      name: phoneData.phone_name,
      link: window.location.href,
      price: versions[0].price,
      version: versions[0].version,
      color: phoneData.color[0],
      img: phoneData.pics[0][0][0]
    }
  }

  render () {
    const detailTitle = new DetailTitle(),
          contentItem = new ContentItem(),
          btnGroup = new BtnGroup();

    let versionList = '',
  	    colorList = '';

    this.phoneData.color.forEach((item, idx) => {
      colorList += contentItem.tpl(item, null, this.phoneData.pics[idx][idx][0], this.phoneData.phone_name, idx);
    });

    this.phoneData.version_info.forEach((item, idx) => {
      versionList += contentItem.tpl(item.version, item.price, null, this.phoneData.phone_name, idx);
    });

    this.$el.append(tpl({
      pic_url: this.phoneData.pics[0][0][0],
      phone_name: this.phoneData.phone_name,
      slogan: this.phoneData.slogan,
      default_price: this.phoneData.default_price,
      title_1: detailTitle.tpl('手机版本'),
      title_2: detailTitle.tpl('手机颜色'),
      versions: versionList,
      colors: colorList,
      bntGroup: btnGroup.tpl()
    }))
  }

  bindEvent () {
    const $versions = this.$el.find('.J_versions'),
          $colors = this.$el.find('.J_colors'),
          $btnGroup = this.$el.find('.J_btnGroup');

    this.versionItems = $versions.children('.content-item');
    this.colorItems = $colors.children('.content-item');
    this.detailPic = this.$el.find('.J_detailPic');

    $versions.on('click', '.content-item', { _this: this }, this.onVersionsClick);
    $colors.on('click', '.content-item', { _this: this }, this.onColorsClick);
  }

  onVersionsClick (ev) {
    const e = ev || window.event,
          _this = e.data._this;

    _this.versionChange(this);
  } 

  onColorsClick (ev) {
    const e = ev || window.event,
          _this = e.data._this;

    _this.colorChange(this);
  }

  versionChange (target) {
    const $target = $(target),
          curIdx = $target.index();

    this.userPhoneInfo.version = $target.attr('data-content');
    this.userPhoneInfo.price = $target.attr('data-price');

    this.versionItems.eq(curIdx).addClass('current')
                     .siblings('.content-item').removeClass('current');
  }

  colorChange (target) {
    const $target = $(target),
           curIdx = $target.index();

    this.userPhoneInfo.color = $target.attr('data-content');
    this.userPhoneInfo.img = $target.attr('data-pic');
    console.log(this.userPhoneInfo.img)
    this.detailPic.attr('src', this.userPhoneInfo.img);
    this.colorItems.eq(curIdx).addClass('current')
                   .siblings('.content-item').removeClass('current');
  }
}