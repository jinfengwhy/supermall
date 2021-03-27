<template>
  <div class="cart-item">
    {{item}}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>