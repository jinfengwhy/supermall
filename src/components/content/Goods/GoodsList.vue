<template>
  <div class="goods-list">
    <goods-list-item v-for="goodsItem in goods" v-bind:key="goodsItem.link" 
      :goods-item="goodsItem"/>
  </div>  
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 2px;
  }
</style>
