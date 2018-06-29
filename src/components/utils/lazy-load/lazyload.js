import Lazy from './lazy'

export default {
  getLazy: (function () {
    let instance
    return function () {
      if (!instance) {
        const LazyClass = Lazy()
        instance = new LazyClass()
      }
      return instance
    }
  }())
}
