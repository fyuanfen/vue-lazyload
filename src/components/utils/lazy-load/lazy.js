/**
 * Created by yurielzhang on 2017/6/22.
 */

import {
  remove,
  throttle
} from './util'

export default function () {
  return class Lazy {
    constructor () {
      this.ListenerQueue = []
      this.lazyLoadHandler = throttle(() => {
        let catIn = false
        this.ListenerQueue.forEach((listener, index, arr) => {
          // TODO : for lazyLoad
          // if (listener.state.loaded) return;
          // catIn ? listener.load() : listener.unload();

          // TODO : for scrollLoad
          catIn = listener.checkInView()
          if (!listener.state.loaded) {
            listener.load()
          }
          if (!catIn) {
            listener.hideImage()
          } else {
            listener.showImage()
          }
        })
      }, 200)
    }

    /**
     * add lazy component to queue
     * @param  {Vue} vm lazy component instance
     * @return
     */
    addLazyBox (vm) {
      this.ListenerQueue.push(vm)
      this._addListenerTarget(window)
      if (vm.$el) {
        this._addListenerTarget(vm.$el)
      }
    }
    _addListenerTarget () {
      window.addEventListener('scroll', this.lazyLoadHandler, false)
      window.addEventListener('resize', this.lazyLoadHandler, false)
    }
    _removeListenerTarget () {
      window.removeEventListener('scroll', this.lazyLoadHandler, false)// attention:this.lazyLoadHandler()需要有()，代表立即执行
      window.removeEventListener('resize', this.lazyLoadHandler, false)
    }
    /**
     * remove lazy components form list
     * @param  {Vue} vm Vue instance
     * @return
     */
    removeComponent (vm) {
      if (!vm) return
      remove(this.ListenerQueue, vm)
      if (vm.$el) {
        this._removeListenerTarget(vm.$el)
      }
      // this._removeListenerTarget(window)
    }
  }
}
