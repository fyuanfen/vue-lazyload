/**
 * Created by yurielzhang on 2017/6/22.
 */
import lazyLoad from './lazyload'
export default {
  data () {
    return {
      state: {
        loaded: false
      },
      rect: {},
      show: true
    }
  },
  computed: {
    isLazyload () {
      return this.state// if the attr "this.state" exists, this is a lazyLoad component.
    }
  },
  mounted () {
    const lazy = this.getLazyInstance()
    lazy.addLazyBox(this)// add the img into imgList
    lazy.lazyLoadHandler()
  },
  beforeDestroy () {
    this.getLazyInstance().removeComponent(this)
  },
  methods: {
    getLazyInstance () {
      return lazyLoad.getLazy()
    },
    getRect () {
     // when the component is out of view zone ,the attr display=none, so we can't get the rect of the component,
     // Instead, we get the parent of this lazyLoad component
      if (typeof (this.$el.getBoundingClientRect) === 'function') {
        const { top, bottom, left, right } = this.$el.getBoundingClientRect()
        if (top === 0 && bottom === 0 && left === 0 && right === 0 && this.$parent) {
          this.rect = this.$parent.$el.getBoundingClientRect()
        } else {
          this.rect = this.$el.getBoundingClientRect()
        }
      }
    },
    checkInView () {
      this.getRect()
      // console.log(this);
      // return (this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0) &&
      //   (this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0)
      return (this.rect.top < window.innerHeight * 1.8 && this.rect.bottom > 0) &&
        (this.rect.left < window.innerWidth * 1.8 && this.rect.right > 0)
    },
    load () {
      if (this.imageUrl) {
        this.src = 'url(' + this.imageUrl + ')'
        this.state.loaded = true
      } else {
        this.state.loaded = false
      }
    },
    hideImage () {
      this.show = false
    },
    showImage () {
      this.show = true
      this.$emit('show', this)
    }
  }
}
