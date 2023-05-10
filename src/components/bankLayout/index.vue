<template>
    <div class="bank-layout">
      <!--头部-->
      <bankHeader></bankHeader>
      <!--内容-->
      <bankMain class="bankMain" id="bankMain"></bankMain>
      <!--脚注-->
      <bankFooter></bankFooter>
      <!-- loading -->
      <bankLoading></bankLoading>
    </div>
</template>
<script>
import bankHeader from '../bankHeader';
import bankMain from '../bankMain';
import bankFooter from '../bankFooter';
import bankLoading from '../bankLoading';
export default {
  name: 'BankLayout',
   components: {
    bankHeader,
    bankMain,
    bankFooter,
    bankLoading
  },
  data() {
    return{}
  },
  computed: {
    
  },
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
