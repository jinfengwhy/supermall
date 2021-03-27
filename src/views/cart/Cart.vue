<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import NavBar from 'components/common/navbar/NavBar'

export default {
  components: {
    NavBar
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
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
