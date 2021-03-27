import { debounce } from 'common/utils'

import BackTop from 'components/content/BackTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    // 在created钩子中通过$refs去引用时对象可能为空，只是创建了实例
    // 在mounted钩子中通过$refs去引用时，值是存在的，template模板已挂载
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)

    // 2.保存事件监听函数，是为了卸载事件时使用
    this.itemImgListener = () => {
      if (this.$route.path.indexOf('detail') >= 0) {
        console.log('详情页监听到了itemImgLoad事件');
      } else if (this.$route.path.indexOf('home') >= 0) {
        console.log('首页监听到了itemImgLoad事件');
      }
      this.newRefresh();
    }

    // 3.进行监听
    this.$bus.$on('itemImgLoad', this.itemImgListener)

    // 知识点补充：
    // mounted函数在混入的vue组件实例中只会执行一次
    // 虽然itemImgLoad事件被触发了多次
    // 但是newRefresh只会被赋值一次，itemImgListener也只会被赋值一次
    // 这与直接把方法放置到methods钩子函数中是有区别的
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}