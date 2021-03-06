<template>
  <div id="home">
    
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" 
      :probe-type="3" @scroll="contentScroll"
      :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    
    <back-top v-show="isShowBackTop" @click.native="backClick"/>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/Goods/GoodsList'
  import BackTop from 'components/content/BackTop/BackTop'

  import { getHomeMultiData, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils'

  export default {
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},  // 流行
          new: {page: 0, list: []},  // 新款
          sell: {page: 0, list: []}  // 精选
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultiData()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 1.图片加载完成的事件监听
      // 在created钩子中通过$refs去引用时对象可能为空，只是创建了实例
      // 在mounted钩子中通过$refs去引用时，值是存在的，template模板已挂载
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })

      // 2.获取tabControl的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      /**
       * 网络请求相关的方法
       */
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

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
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
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  /* 第二种方案计算响应的高度 */
  /* .content {
    overflow: hidden;
    height: calc(100% - 44px - 49px);
    margin-top: 44px;
  } */
</style>
