<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 语法一：使用数组
    // ...mapGetters(['cartLength', 'cartList']),

    // 语法二：使用对象的方式，可以起别名
    ...mapGetters({
      'length': 'cartLength',
      'list': 'cartList'
    })
  }
}
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
