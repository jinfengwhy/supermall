<template>
  <div>
    我是详情页{{iid}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.query.iid
  }
}
</script>
