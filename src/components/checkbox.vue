<template lang="pug">
label.mf-checkbox(:class="{disabled: disabled, checked: checked}")
  .mf-checkbox__box
    .mf-checkbox__tick.mf-icon-tick--line
  input.mf-input__original.mf-checkbox__original(
    ref="input",
    type="checkbox",
    :disabled="disabled",
    :value="value" ,
    v-model="idArr")
  .mf-checkbox__label
    slot
</template>

<style lang="scss">
  @import "../styles/index";
$icomoon-font-path: '../../../assets/fonts';
.mf {
  &-input {
    &__original {
      display: none;
    }
  }
  &-checkbox {
    cursor: pointer;
    display: flex;
    align-items: center;
    $ns: &;
    &--light {
      &#{$ns}:hover {
        #{$ns}__box {
          border-color: $d-c-primary;
          opacity: 1;
        }
      }
      #{$ns}__box {
        width: rem(14);
        height: rem(14);
        box-sizing: border-box;
        border: solid rem(1) $d-c-text-onW--light;
        border-radius: $d-s-borderRadius;
        background-color: white;
        opacity: 0;//default hide
        #{$ns}__tick {
          font-size: rem(10);
          color: white;
          visibility: hidden;
        }
      }
      #{$ns}__label {
        margin-left: rem(5);
      }
      &#{$ns}.checked {
        #{$ns}__box {
          opacity:1;
          background-color: $d-c-primary;
          border-color: $d-c-primary;
          #{$ns}__tick {
            visibility: visible;
          }
        }
      }
      &#{$ns}.disabled {
        cursor: default;
        opacity: 0.6;
        pointer-events: none;
        #{$ns}__box {

        }
      }
    }
    // &:hover {
    //   #{$ns}__box {
    //     border-color: $d-c-primary;
    //   }
    // }
    // &__box {
    //   width: rem(14);
    //   height: rem(14);
    //   box-sizing: border-box;
    //   border: solid rem(1) $d-c-text-onW--light;
    //   border-radius: $d-s-borderRadius;
    //   background-color: white;
    //   #{$ns}__tick {
    //     @include small-font-size(10);
    //     color: white;
    //     visibility: hidden;
    //   }
    // }
    // &__label {
    //   margin-left: rem(5);
    // }
    // &.checked {
    //   #{$ns}__box {
    //     background-color: $d-c-primary;
    //     border-color: $d-c-primary;
    //     #{$ns}__tick {
    //       visibility: visible;
    //     }
    //   }
    // }
    // &.disabled {
    //   cursor: default;
    //   #{$ns}__box {
    //     opacity: 0.6;
    //   }
    // }
  }
}
</style>

<script>

export default {
  name: 'mf-checkbox',
  data () {
    return {
      checked: false,
      idArr: this.selectedArr
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedArr: {
      type: Array,
      default: []
    }
  },
  watch: {
    selectedArr (val) {
      this.idArr = val
    },
    idArr () {
      this.$emit('input', this.idArr)
      for (var index in this.idArr) {
        if (this.idArr[index] === Number(this.$refs.input.value)) { // type convert
          this.checked = true
          return
        }
      }
      this.checked = false
    }
  },
  methods: {
  }
}
</script>
