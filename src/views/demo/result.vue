 <template>
  <div class="wrap">
    <el-result :icon="icon" :title="title" subTitle="">
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
    return {
      icon: '',
      title: ''
    };
  },
  created() {
    console.log('是否成功', this.$route.query.result);
    if (this.$route.query.result == 0) {
      this.icon = 'success';
      this.title = '提交成功';
    } else {
      this.icon = 'error';
      this.title = '提交失败';
    }
  },
  methods: {
    goComfirm() {
      this.$router.push({
        path: `demo`
      });
    }
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