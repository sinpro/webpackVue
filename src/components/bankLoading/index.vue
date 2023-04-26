<template>
    <div class="bankLoading" v-show="getLoading||getMaskLayer">
        <div class="bankLoading-cont" v-show="getLoading">
            <img src="../../images/Loading.gif" alt="">
        </div>
    </div>
</template>
<script>
import { mapGetters} from 'vuex';
export default {
  name: 'BankLoading',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getLoading','getMaskLayer'])
  },
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
