<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import {getDetail, Goods} from 'network/detail'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  created() {
    // 1.保存传过来的商品id
    this.iid = this.$route.query.iid

    // 2.请求详情页所需的数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>
