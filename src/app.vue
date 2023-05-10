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
import {CBBC050060} from 'src/apis/common';
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
    this.queryFun();
  },
  methods:{
    queryFun(){
      CBBC050060({})
        .then(res => {
          if (res.header.errorCode === '0') {
            
          } else {
            
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
