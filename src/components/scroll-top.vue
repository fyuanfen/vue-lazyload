<template lang="pug">
  .mfb-side-buttons
    transition(name="fade")
      .mfb-side-buttons__scrolltop.mf-icon-to-top(v-show="isShow", title="回到顶部", @click="backTop")
</template>

<style lang="scss", rel="stylesheet/scss">
  $icomoon-font-path: '../assets/fonts';
  .mfb {
    &-side-buttons {
      box-sizing: border-box;
      z-index: 10;
      padding: 0 6px;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      position: relative;
      &__scrolltop {
        &:visited{
          color : #ffffff;
        }
        &:hover{
          background-color: rgba(47, 43, 43, 1.0);
        }
        &:before{
            content: "\E929";
        }
        position: fixed;
        right: 30px;
        display: block;
        color : #ffffff;
        font-size : 30px;
        width: 50px;
        height: 50px;
        background-color: rgba(32, 32, 32, 0.6);
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
        border-radius : 50%;
        bottom: 40px;
        padding:10px;

        &.mfb-icon-to-top{
          line-height : 1.6;
        }

      }
    }
  }
</style>

<script>

  export default {
    name: 'scroll-top',
    data () {
      return {
        isShow: false,
        distance: 0
      }
    },
    methods: {
      scrollFunc () {
        if (window.pageYOffset > 100) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      },
      interVelScroll () {
        const now = window.scrollY
        window.scroll(0, now - this.distance)
        if (now > 30) {
          window.requestAnimationFrame(this.interVelScroll)
        }
      },
      backTop () {
        const start = window.scrollY
        const totalTime = 200
        this.distance = start / (totalTime / 16.7)
        console.log(this.distance)
        this.interVelScroll()
      }
    },
    mounted () {
      window.onscroll = this.scrollFunc
    }
  }
</script>
