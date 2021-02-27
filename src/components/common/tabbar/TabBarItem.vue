<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div :style="styleObject">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    link: {
      type: String,
      require: true
    },
    activeClass: {
      type: String,
      default: 'deepPink'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) >= 0 ? true : false
    },
    styleObject() {
      return this.isActive ? {color: this.activeClass} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link)
    }
  }
}
</script>

<style>
  .tabbar-item {
    flex: 1;
    text-align: center;
  }
  .tabbar-item img {
    margin-top: 3px;
    width: 24px;
    height: 24px;
    margin-bottom: -2px;
  }
</style>