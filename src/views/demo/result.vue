 <template>
  <div class="wrap">
    <el-result icon="success" title="成功提示" subTitle="">
      <template slot="extra">
        <div class="btn" @click="goComfirm">完成</div>
      </template>
    </el-result>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {};
  },
  methods:{
 goComfirm() {
      this.$router.push({
        path: `demo`
      });
    },
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrap {
  .btn {
    border: 1px solid #c5bdbd;
    width: 118px;
    height: 22px;
    line-height: 22px;
  }
}
</style>