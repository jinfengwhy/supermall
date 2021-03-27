<template>
  <scroll class="cart-list">
    <cart-item 
    v-for="(item, index) in cartList" 
    :key='index' :item='item'/>
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
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>>
