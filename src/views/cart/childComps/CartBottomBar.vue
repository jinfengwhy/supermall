<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
        :isChecked="allChecked"
        @click.native='btnClick'/>
      <span>全选</span>
    </div>
    <div class="sum-price">
      合计:{{totalPrice}}
    </div>
    <div class="to-calc">
      去计算({{totalCount}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/CheckButton/CheckButton'

export default {
  components: {
    CheckButton 
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    totalCount() {
      return this.$store.getters.cartList.filter(item => item.checked).length
    },
    allChecked() {
      return this.$store.getters.cartList.every(item => item.checked)
    }
  },
  methods: {
    btnClick() {
      let flag = !this.$store.state.every(item => item.checked)
      this.$store.state.cartList.map(item => {
        item.checked = flag
      })
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    background: #e6e6e6;
    height: 40px;

    display: flex;
    align-items: center;
  }
  .check-content {
    display: flex;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin: 0 8px;
  }
  .sum-price {
    flex: 1;
    padding-left: 30px;
  }
  .to-calc {
    width: 90px;
    text-align: center;
    background: red;
    height: 40px;
    line-height: 40px;
    color: #fff;
  }
</style>
