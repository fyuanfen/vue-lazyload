<template lang="pug">
transition(name='fade')
  .popup__wrapper(v-show='visible', @click.self="onClickWrapper", :class="{modal:modal}")
    .popup__content
      slot(name="title")
        h3.title {{title}}
      slot
        .content {{content}}
      slot(name="action")
        .action-buttons
          button.button.primary(v-show="buttonOK", @click="onClickButtonOK") 确定
          button.button.link-button(v-show="buttonCancel", @click="onClickButtonCancel") 取消
</template>

<style lang="scss", rel="stylesheet/scss">
  @import "../styles/index";
.popup__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  &.modal {
    background-color: rgba(30, 30, 30, 0.8);
  }
  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    .popup__content{
      transform: translateY(-40px);
      transition-duration: 250ms;
    }
  }
  &.fade-enter-active{
    .popup__content{
      transition-duration: 250ms;
    }
    transition: all 250ms ease-in;
  }
  &.fade-leave-active{
    transition: all 250ms ease-out;
  }

  .popup__content {
    // flex: 0 0; // Bugs in IE11 Edge Safire.
    align-self: center; // min-width: rem(555);
    // min-height: rem(307);
    border-radius: 5px;
    background-color: $filter-background;
    .title {
      margin-top: rem(50);
      margin-bottom: rem(20);
      height: rem(33);
      min-width: rem(555);
      width: 100%;
      max-width: 99vw;
      text-align: center;
      font-size: rem(24);
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: $primary;
    }
    .content {
      margin-top: rem(20);
      margin-left: rem(35);
      margin-right: rem(35);
      margin-bottom: rem(25);
      padding: rem(30);
      border-radius: rem(5);
      background-color: $page-background;
      border: solid 1px #eeeeee;
      line-height: 2.14;
      letter-spacing: normal;
      text-align: left;
      color: $filter-text;
    }
    .action-buttons {
      margin: rem(25) rem(35);
      display: flex;
      flex-flow: row-reverse nowrap;
      .button {
        padding: 0 rem(31);
        height: rem(34);
        border: none;
        &.link-button {
          color: $info-text;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'popup',
  data () {
    return {
      visible: !!this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },

    modal: {
      type: Boolean,
      default: true
    },

    title: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    },

    buttonOK: {
      type: Boolean,
      default: true
    },

    buttonCancel: {
      type: Boolean,
      default: true
    },

    buttonIgnore: {
      type: Boolean,
      default: false
    },

    dismissible: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value (val) {
      this.visible = !!val
    },
    visible (val) {
      this.$emit('input', this.visible)
      if (val) {
        this.$emit('open')
      } else {
        this.$emit('close')
      }
    }
  },
  methods: {
    onClickWrapper () {
      if (this.dismissible && this.visible) {
        this.$emit('Cancel')
        this.visible = false
      }
    },
    onClickButtonOK () {
      this.$emit('OK')
      if (this.dismissible) {
        this.visible = false
      }
    },
    onClickButtonCancel () {
      this.$emit('Cancel')
      if (this.dismissible) {
        this.visible = false
      }
    }
  },
  mounted () {
    if (this.value !== false) {
      this.visible = !!this.value
    }
  }
}
</script>
