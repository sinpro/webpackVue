<template>
  <div class="error-page">
    <!-- <img src="../../images/scrcu_logo.png" rel="404"> -->
    <p class="error-tip">抱歉，您访问的页面不存在</p>
    <button type="primary" @click="()=>$router.push('/home')">返回首页</button>
  </div>
</template>

<script>
export default {

};
</script>

<style lang='scss' scoped>
@import './index';
</style>
