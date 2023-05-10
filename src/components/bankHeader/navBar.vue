<template>
  <div class="navBar">
    <ul class="clearfix">
      <li v-for="(item, i) in navList" :key="i">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  components: {},
  data() {
    return {
      navList: [
        { key: '1', name: '首页' },
        { key: '2', name: '外币兑换' },
        { key: '3', name: '存款' },
        { key: '4', name: '转账' },
        // { key: '5', name: '一级导航' },
        // { key: '6', name: '一级导航' },
        // { key: '7', name: '一级导航' },
        // { key: '8', name: '一级导航' },
        // { key: '9', name: '一级导航' },
        // { key: '10', name: '一级导航' }
      ]
    };
  },
  computed: {}
};
</script>
<style scoped lang="scss">
.navBar {
  background-color: #999999;
  color: #fff;
  padding: 0 20px;
  // width: 100%;
  // height: 35px;
  // line-height: 35px;
  ul {
    li {
      float: left;
      // width: 60px;
      margin-right: 10px;
      // line-height: 20px;
      cursor: pointer;
      padding: 10px 20px;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
    }
    li:hover {
      color: #444;
      background: #cccccc;
    }
  }
}
</style>
