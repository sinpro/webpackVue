<template>
  <div>
    <transition name="fadeIn">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      window.app = this;
    }
    console.log(
      process.env.NODE_ENV,
      process.env.NODE_TYPE,
      process.env.NODE_MODE,
      '环境'
    );
    console.log(ENV_CONFIG);
  }
};
</script>
<style lang="scss" scoped></style>
