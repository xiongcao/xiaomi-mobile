import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import indicatorTpl from './tpl/indicator.tpl';
import controlTpl from './tpl/control.tpl';
import './index.scss'
import tools from '../../utils/tools'

export default class Carousel {
  constructor (el, data) {
    this.name = 'carousel';
    this.$el = el;
    this.data = data;
    this.dataLen = this.data.length;
    this.curIndex = 0;
    
  }

  async init () {
    await this.render();
    this.autoPlay()
    this.handleEvent()
  }

  async render () {
    await this.$el.append(tpl({
      list: this.handleListTpl(),
      indicator: this.handleIndicatorTpl(),
      control: controlTpl(),
      indicatorW: 18 * this.dataLen
    }))

    this.$carousel = $('.J_carousel')
    this.$carItems = this.$carousel.find('.car-item')
    this.$carIndicators = this.$carousel.find('.indicator-item')
  }

  autoPlay () {
    this.timer = setInterval(this.run.bind(this, 'next'), 3000)
  }

  handleEvent () {
    this.$carousel.on('click', $.proxy(this.handleClickCarousel, this))
    this.$carousel.on('mouseenter', $.proxy(this.handleMouseEnter, this))
    this.$carousel.on('mouseleave', $.proxy(this.handleMouseEnter, this))
  }

  run (dir) {
    switch(dir) {
      case "next":
        if (this.curIndex >= this.dataLen - 1) {
          this.curIndex = 0
        } else {
          this.curIndex++
        }
        break;
      case "prev":
        if (this.curIndex === 0) {
          this.curIndex = this.dataLen - 1
        } else {
          this.curIndex--
        }
      break;
      default:
        break;
    }
    this.fadeActive()
  }

  fadeActive () {
    this.$carItems.eq(this.curIndex).fadeIn(1000).siblings().fadeOut()
    this.$carIndicators.eq(this.curIndex).fadeIn().siblings().fadeOut()
  }

  handleListTpl () {
    let list = ''
    this.data.forEach((item, i) => {
      list += itemTpl({
        id: item.id,
        alt: item.alt,
        swiper_img: item.pic,
        isActive: i === 0 ? 'active' : ''
      })
    });
    return list
  }

  handleIndicatorTpl () {
    let list = ''
    for (let i = 0; i < this.dataLen; i++) {
      list += indicatorTpl({
        isCurrent: i === 0 ? 'current' : ''
      })
    }
    return list
  }

  handleClickCarousel (e) {
    let tar = e.target
    let className = tools.trimSpaces(tar.className)
    let $tar = $(tar)
    switch (className) {
      case "indicator-item":
        this.curIndex = $tar.index()
        this.fadeActive()
        break;
      case "car-control":
        this.run($tar.data('dir'))
        break;
      default:
        break
    }
  }
  
  handleMouseEnter (e) {
    let eType = e.type
    switch(eType) {
      case "mouseenter":
        clearInterval(this.timer)
        break;
      case "mouseleave":
        this.autoPlay()
        break;
      default:
      break;
    }
  }

}
