<template>
  <div class="toast" v-show="show">
    {{message}}
  </div>  
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
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

    padding: 7px 10px;
    border-radius: 5px;
    color: #fff;
    background: rgba(0, 0, 0, 0.75);
  }
</style>
