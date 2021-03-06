<template>
  <div>
    <h2>分类</h2>
    <ul class="content">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
      <li>item4</li>
      <li>item5</li>
      <li>item6</li>
      <li>item7</li>
      <li>item8</li>
      <li>item9</li>
      <li>item10</li>
      <li>item11</li>
      <li>item12</li>
      <li>item13</li>
      <li>item14</li>
      <li>item15</li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  ul li {
    height: 100px;
  }
  .content {
    height: 300px;
    background-color: red;

    overflow: hidden;
    overflow-y: scroll;
  }
</style>
