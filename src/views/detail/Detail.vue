<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" 
      @scroll="contentScroll" :probe-type='3'>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/Goods/GoodsList'

import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  created() {
    // 1.保存传过来的商品id
    this.iid = this.$route.query.iid

    // 2.请求详情页所需的数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 1.获取顶部的轮播图
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4.获取商品的详情信息
      this.detailInfo = data.detailInfo
      // 5.获取商品的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取商品的评论信息
      if(data.rate.cRate > 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
  
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  
    // 4.给themeTopYs赋值
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
    }, 200)
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      // 直接调用混入对象中的newRefresh
      this.newRefresh()

      // 等图片加载完毕后获取子组件的offsetTop，并且加了防抖
      this.getThemeTopYs()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // 1. 将滚动内容与title的显示关联起来
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        if ((this.currentIndex != i) && (
          (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
        )) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      
      // 2. 判断是否要显示backTop图标
      this.listenBackTop(position)
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      // 2. 添加到vuex当中
      this.$store.commit('addCart', product)
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  } 
  /* .detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
  } */
  .content {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
</style>
