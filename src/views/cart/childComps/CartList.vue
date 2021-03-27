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
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>>
