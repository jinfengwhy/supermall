<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>  
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // click属性的默认值是false
        // 被better-scroll包裹的东西默认只有button是可以监听点击的，
        // 普通的div没法监听click的，设置该属性为true才能监听
        click: true,

        // 0,1都是不侦测实时的位置
        // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
        // 3: 只要是滚动, 都侦测.
        probeType: this.probeType
      })

      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    }  
  }
</script>

<style scoped>

</style>