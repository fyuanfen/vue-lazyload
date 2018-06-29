<template lang="pug">
  transition(name="mf-ani-fade")
    .mf-image.mf-image__background(v-show="show", ref="background")
      img.mf-image__loader(v-show="imgContextMenu", :class="{'mf-image__lazy': show === false}", ref="imageLoader")
      .mf-image__content(:style="{'backgroundImage': src}", ref="content")
</template>

<style lang="scss", rel="stylesheet/scss">
  @import "../styles/partial/variables";
  .mf {
    &-image {
      background-size: contain;
      position: relative;
      overflow: hidden;
      background-color: black;
      background-position: center;

      &__loader {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        display: block;
      }
      &__content {
        position: absolute;
        left: 0;
        top: 0;
        background-size:contain;
        background-position: center;
        background-repeat:no-repeat;
        pointer-events: none;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

<script>

import lazyMixin from './utils/lazy-load/lazyload-mixin'
export default {
  name: 'mf-image',
  data () {
    return {
      src: '',
      height: 0,
      width: 0
    }
  },
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    imgContextMenu: {
      type: Boolean,
      default: true
    }
  },
  mixins: [
    lazyMixin
  ],
  watch: {
    imageUrl (v) {
      this.switchImage(v)
    }
  },
  methods: {
    reset () {
      this.src = ''
      this.height = 0
      this.width = 0
    },
    switchImage (url) {
      this.reset()
        // added for lazyLoad
      if (!this.isLazyload || this.show) {
        this.src = url
      } else {
        this.getLazyInstance().lazyLoadHandler()
      }
    }
  },
  mounted () {
    this.switchImage(this.imageUrl)
  }
}
</script>
