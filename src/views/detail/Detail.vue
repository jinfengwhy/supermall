<template>
  <div id="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'

export default {
  data() {
    return {
      iid: null
    }
  },
  components: {
    DetailNavBar
  },
  created() {
    this.iid = this.$route.query.iid
  }
}
</script>
