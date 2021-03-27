import Vue from 'vue'
import Vuex from 'vuex'

// 第一步：安装
Vue.use(Vuex)

// 第二步：创建对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        oldProduct.count++
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  }
})

// 第三步：导出
export default store
