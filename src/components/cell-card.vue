<template lang="pug">
  .mf-cell-card
    .mf-cell-card__body
      .mf-cell-card__thumbnail(@click="onMainClick")
        mf-image.mf-cell-card__thumbnail-content.mf-cell-card__img( :image-url="asset?asset.imgUrl:''")
        .mf-cell-card__thumbnail-content.mf-cell-card__overlay
      .mf-cell-card__info
        .mf-cell-card__info-item
          //.mf-cell-card__info-icon.mf-icon-view
          .mf-cell-card__info-icon.mf-tag
            span {{asset?asset.title:''}}
        .mf-cell-card__info-spacer
        .mf-cell-card__info-item
          .mf-cell-card__info-icon.mf-icon-collection
        .mf-cell-card__info-item
          .mf-cell-card__info-icon.mf-icon-download(@click="onDownloadBtClick")
</template>

<style lang="scss", rel="stylesheet/scss">
  @import "../styles/index";
  .mf {
    &-tag {
      padding:rem(4);
      background-color:rgb(215,215,215);
      color:rgb(150,150,150);
      @include text-ellipsis
    }
    &-cell-card {
      $scope: &;
      &__body {
        border-radius: $d-s-borderRadius;
        background-color: #FFF;
        box-shadow: $d-shadow-3;
      }
      &__thumbnail {
        @include aspect-ratio(16, 10, #{&}-content);
        &-content {
          border-radius: $d-s-borderRadius $d-s-borderRadius 0 0;
        }
      }
      &__img {

      }
      &__overlay {
        cursor: pointer;
        & > #{$scope}__ctrls {
          display: inline-block;
          position: absolute;
          top: rem(15);
          right: rem(15);
          opacity: 0;
          // transition: opacity $d-t-s linear;
          & > #{$scope}-ctrl {
            &:not(:first-child) {
              margin-top: rem(10);
            }
          }
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          & > #{$scope}__ctrls {
            opacity: 1
          }
        }
      }
      &__info {
        display: flex;
        color: $d-c-text-onW--light;
        font-size: $d-s-font--s;
        &-item {
          max-width:60%;
          display: flex;
          margin: rem(10) 0 rem(10) rem(10);

          a {
            text-decoration:none;
            out-line: none;
            color:rgb(189,189,189);
          }
          &--clickable {
            cursor: pointer;
            margin: 0;
            padding: rem(10);
            &.active {
              color: $d-c-primary;
            }
          }
        }
        &-icon {
          margin-right: rem(4);
          &.mf-icon-download {
            cursor: pointer;
          }
        }
        &-spacer {
          flex: 1;
        }
      }
    }
  }
</style>

<script>

import mfImage from './lazyload-image.vue'

export default {
  name: 'cell-card',
  data () {
    return {
      isPopup: true
    }
  },
  props: {
    asset: {
      required: true
    }
  },
  components: {
    mfImage
  },
  methods: {
    onMainClick () {
      this.$emit('click')
    },
    onDownloadBtClick () {
      this.$emit('download')
    }
  }
}
</script>
