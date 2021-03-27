<template>
  <div class="check-button" :class="{checked: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    border: 2px solid #aaa;
    border-radius: 50%;
  }
  .checked {
    background: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
