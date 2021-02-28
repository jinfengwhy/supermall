<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"/>

    <div style="width: 100%;height:1000px;"></div>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/TabControl/TabControl'

  import { getHomeMultiData, getHomeGoods } from 'network/home'

  export default {
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},  // 流行
          new: {page: 0, list: []},  // 新款
          sell: {page: 0, list: []}  // 精选
        }
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultiData()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
