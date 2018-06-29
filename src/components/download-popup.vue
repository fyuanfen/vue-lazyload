<template lang="pug">
  popup.model_download__popup(v-model="show_popup", :modal="true", :dismissible="true",
  :buttonOK="false", :showCancel="false", title="下载图片",@Cancel="onCancelButton")
    .content
      .download_info
        p
          span.model_download__title {{model? model.title:''}}
    .action-buttons(slot="action")
      a(:href="local_url", ref="downloader", v-show="false", :download="( model? model.name : 'download') + '.zip'")
      button.button.primary(@click="downloadFile") 下载
      button.button.link-button(@click="onCancelButton") 取消
</template>

<style lang='scss', rel="stylesheet/scss">

  .model_download__popup {
    .popup__content .content {
      padding: rem(20) !important;
    }
    .download_thumbnail, .download_info {
      vertical-align: middle;
      height: rem(76.5);
      display: inline-block;
    }
    .download_thumbnail {
      width: rem(124);
      border-radius: rem(4);
    }
    .download_info {
      margin-left: rem(20);
      max-width: rem(300);
      p {
        margin: rem(8) 0;
        white-space: nowrap;

        span.model_download__title {
          white-space: nowrap;
          max-width: 75%;
        }

        > span {
          display: inline-block;
          line-height: 0.9;
        }

        i.mf-icon-information {
          margin-left: 0.2rem;
          color: #ffffff;
        }
      }
    }
  }
</style>

<script>
import popup from './popup.vue'

export default {
  name: 'download-popup',
  data () {
    return {
      local_url: '',
      show_popup: this.value
    }
  },
  props: {
    model: {
      type: Object
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  watch: {
    value (val) {
      this.show_popup = val
    },
    show_popup (val) {
      this.$emit('refresh', val)
    }
  },
  methods: {
    onCancelButton () {
      this.show_popup = false
      this.$emit('refresh', this.show_popup)
    },
    downloadFile () {
      this.local_url = this.model.imgUrl
      console.log(this.local_url)
      return this.$nextTick(() => {
        this.$refs.downloader.click()
        this.show_popup = false
        setTimeout(() => {
          this.local_url = ''
        }, 500)// refresh
      })
    }
  },
  components: {
    popup
  },
  mounted () {
  }
}
</script>
