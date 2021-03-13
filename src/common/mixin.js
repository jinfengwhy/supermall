import { debounce } from 'common/utils'

export const itemListenerMixin = {
  data() {
    itemImgListener: null
  },
  mounted() {
    // 1.图片加载完成的事件监听
    // 在created钩子中通过$refs去引用时对象可能为空，只是创建了实例
    // 在mounted钩子中通过$refs去引用时，值是存在的，template模板已挂载
    const refresh = debounce(this.$refs.scroll.refresh, 200)

    // 2.保存事件监听函数，是为了卸载事件时使用
    this.itemImgListener = () => {
      if (this.$route.path.indexOf('detail') >= 0) {
        console.log('详情页监听到了itemImgLoad事件');
      } else if (this.$route.path.indexOf('home') >= 0) {
        console.log('首页监听到了itemImgLoad事件');
      }
      refresh()
    }

    // 3.进行监听
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}