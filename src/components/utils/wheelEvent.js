'use strict'
/**
 * v-window-message
 * @desc 接收发往本dom的
 * @example
 * ```vue
 * <div v-wheel-event="handleMessage">
 * ```
 */
import Vue from 'vue'

// Detect which wheel event are supported.
let MOUSE_WHEEL_EVENT_NAME = 'wheel'

function isMouseEventSupported (eventName) {
  var el = document.createElement('div')
  eventName = 'on' + eventName
  var isSupported = (eventName in el)
  if (!isSupported) {
    el.setAttribute(eventName, 'return;')
    isSupported = typeof el[eventName] === 'function'
  }
  el = null
  return isSupported
}

if (!Vue.prototype.$isServer) {
  if (!isMouseEventSupported('wheel')) {
    // detect legacy event 'mousewheel'
    if (isMouseEventSupported('mousewheel')) {
      // Old chrome & IE may support this one.
      MOUSE_WHEEL_EVENT_NAME = 'mousewheel'
    } else {
      // Firfox(Gecko) use another event for wheel.
      MOUSE_WHEEL_EVENT_NAME = 'DOMMouseScroll'
    }
  }
}

export default {
  bind (el, binding, vnode) {
    const expression = binding.expression
    const handle = function (e) {
      if (vnode.context) {
        if (!('deltaY' in e)) {
        // Preprocess deltaY (and deltaX) for unsupported browser(IE11 and old Firefox).
          if (MOUSE_WHEEL_EVENT_NAME === 'mousewheel') {
            e.deltaY = -1 / 40 * e.wheelDelta
            e.deltaX = 'wheelDeltaX' in e ? -1 / 40 * e.wheelDeltaX : 0
          } else {
            e.deltaY = e.detail
          }

          e.deltaMode = (e.type === 'MozMousePixelScroll') ? 0 : 1
        }

        vnode.context[expression](e)
      }
    }
    el.addEventListener(MOUSE_WHEEL_EVENT_NAME, handle, true)
    vnode.context['_element_wheel_event_'] = handle
  },

  unbind (el, binding, vnode) {
    el.removeEventListener('scroll', vnode.context['_element_wheel_event_'])
  },

  install (Vue) {
    Vue.directive('wheelEvent', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}
