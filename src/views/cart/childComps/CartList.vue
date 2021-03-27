<template>
  <scroll class="cart-list" ref="scroll">
    <cart-item 
    v-for="(item, index) in cartList" 
    :key='index' :item-info='item'/>
  </scroll>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll'

import CartItem from './CartItem'

export default {
  components: {
    Scroll,
    CartItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    /* 44px是topbar 49px是tabbar 40px是bottombar */
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>>
