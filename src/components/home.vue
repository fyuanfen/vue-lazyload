<template lang="pug">
  .mfb-temp(v-wheel-event="onMouseWheel", ref="container")
    .mf-layout__container.mfb-test-card
      scroll-top
      .mf-layout__cell.mf-layout__cell--card(v-for="(item, index) in assetsList")
        cell-card(
        ref="cardViewer",
        :asset="item",
        @download="onDownloadClick(index)")
    button.mf-more__button(ref="fetchMoreButton", @click="queryNextPage", :disabled="noMoreItems") {{noMoreItems ? '没有更多' : '加载更多'}}
    downloadPopup(:value="isPopup", @refresh="refreshDownloadState", :model = "assetsList[currentAssetIndex]")

</template>

<style lang="scss", rel="stylesheet/scss">

@import "../styles/index";
/*location of checkbox */
.mfb-temp {
  .mf {
    &-layout__cell--card {
      position: relative;

      /*控制hover样式*/
      .mf {
        &-checkbox {
          &--light {
            position: absolute;
            top: rem(8);
            right: rem(8);
          }
        }
        &-cell-card:hover + .mf-checkbox--light {
          .mf-checkbox__box {
            border-color: black;
            opacity: 1;
          }
        }
      }
    }
  }
}


</style>

<script>
  import cellCard from './cell-card.vue'
  import ScrollTop from './scroll-top.vue'
  import downloadPopup from './download-popup.vue'
  import axios from 'axios'
  import WheelEvent from './utils/wheelEvent'

  const PAGE_SIZE = 20
  export default {
    data () {
      return {
        selectArr: [],
        isOverlayShow: false,
        assetsList: [],
        pageNum: 1,
        currentAssetIndex: -1,
        last_wheel_event: new Date(),
        noMoreItems: false,
        overlayNavState: {hasPrev: false, hasNext: false},
        isPopup: false
      }
    },
    components: {
      ScrollTop,
      cellCard,
      downloadPopup
    },
    directives: {
      WheelEvent
    },
    methods: {
      onDownloadClick (index) {
        if (!this.assetsList[index]) {
          return
        }
        this.currentAssetIndex = index
        this.$nextTick(() => {
          this.isPopup = true
        })
      },
      refreshDownloadState (value) {
        this.isPopup = value
      },
      onMouseWheel (e) {
        const now = Date.now()
        const deltaT = now - this.last_wheel_event
        this.last_wheel_event = now
        if (e.deltaY > 0 && deltaT > 400 && 'fetchMoreButton' in this.$refs) {
          const wholePage = this.$refs.container
          const rect = wholePage.getBoundingClientRect()
          if (rect.bottom - 200 <= window.innerHeight) { // -2 for float px range fix.
            this.queryNextPage()
          }
        }
      },
      queryNextPage () {
        this.pageNum = parseInt(this.pageNum, 10) + 1
        this.fetchCards()
      },
      delHtmlTag (str) {
        return str.replace(/<[^>]+>/g, '').replace(/\'/g, "\\\'") // 去掉所有的html标记
      },
      fetchCards () {
        axios({
          method: 'get',
          url: `/searchImg?tn=resultjson_com&ipn=rj&ct=201326592&is=&queryWord=cat&ie=utf-8&pn=${PAGE_SIZE * this.pageNum}&oe=utf-8&word=cat`
        }).then((res) => {
          if (res.data) {
            if (typeof res.data === 'string') {
              const data = this.delHtmlTag(res.data)
              const newData = JSON.parse(data)
              return newData.data
            } else {
              return res.data.data
            }
          }
        })
          .then((res) => {
            // If get card less than one PAGE_SIZE
            // Which indicates no more cards.
            if (res.length < PAGE_SIZE) {
              this.noMoreItems = true
            }
            const result = res.filter((item) => !!item.thumbURL).map((item) => ({
              title: item.fromPageTitleEnc ? item.fromPageTitleEnc.split(' ')[0] : 'unknown',
              imgUrl: encodeURI(item.thumbURL)
            }))

            if (this.pageNum === 1) {
              this.assetsList = result
            } else {
              this.assetsList = this.assetsList.concat(result)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

    },
    created () {
      this.fetchCards()
    }
  }
</script>
