<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>  
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = '默认内容', duration = 1500) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    padding: 7px 10px;
    border-radius: 5px;
    color: #fff;
    background: rgba(0, 0, 0, 0.75);
  }
</style>
