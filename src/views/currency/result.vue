 <template>
  <div class="wrap">
    <el-result :icon="icon" :title="title" subTitle="">
      <template slot="extra">
        <div class="wrap_box">
          <div class="moneyTitle">参考编号：{{formData.copyNum}}</div>
          <div class="moneyTitle">买入金额（瑞士法郎）{{formData.payerCanUse}}</div>
          <div class="moneyTitle">卖出金额（港币）{{formData.payeeCanUse}}</div>
        </div>
        <div class="wrap_info">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-row>
              <el-col :span="12">
                <div class="item">
                  <div class="text">买入账号</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <div class="text">买入账号</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="item">
                  <div class="title">货币</div>
                  <div class="text">{{ formData.payerMoneyTy }}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <div class="title">货币</div>
                  <div class="text">{{ formData.payeeMoneyTy }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="item">
                  <div class="title">账户</div>
                  <div>
                    <div class="text">{{ formData.payerCount }}</div>
                    <div class="text">可用结余：{{ formData.payerCanUse }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <div class="title">账户</div>
                  <div>
                    <div class="text">{{ formData.payeeCount }}</div>
                    <div class="text">可用结余：{{ formData.payeeCanUse }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="item">
                  <div class="title">附言</div>
                  <div style="display: flex; justify-content: space-around">
                    <div class="text">{{ formData.payeeContent }}</div>
                    <div class="text">可用结余：{{ formData.payeeCanUse }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="wrap_btn">
          <div class="btn" @click="recover">返回首页</div>
          <div class="btn btn_ok" @click="goComfirm">另一种外币兑换</div>
        </div>
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
      title: '',
      formData: {
        payeeCount: '255-20-6108889 HKD储蓄帐户',
        payerCount: '255-20-6108889 HKD储蓄帐户',
        payerMoneyTy: 'HDO',
        payeeMoneyTy: 'HDK',
        payerCanUse: '82.27',
        payeeCanUse: '27372.00',
        payerMoneyNum: '800.00',
        payeeMoneyNum: '800.00',
        payeeContent: '瑞士法郎1 港元 8.85103655-8.37909845',
        copyNum:"09879797777777"
      }
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
        path: `currency`
      });
    },
    recover() {
      this.$router.push({
        path: `currency`
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 20px;
  /deep/ .el-result {
    padding: 0;
    .el-result__extra {
      width: 100%;
    }
  }

  .wrap_box {
    text-align: center;
    .moneyNum {
      font-size: 16px;
    }
  }
  .wrap_info {
    margin-top: 40px;
    .item {
      display: flex;
      align-items: center;
      border: 1px solid #e7e3e3;
      height: 60px;

      .title {
        background-color: #eee;
        width: 130px;
        height: 100%;
        line-height: 60px;
        padding-left: 12px;
      }
      .text {
        padding-left: 12px;
      }
    }
  }
  .wrap_btn {
    margin: 40px;
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 28px;
    .btn {
      width: 130px;
      height: 28px;
      border: 1px solid #eee;
      font-size: 15px;
      border-radius: 5px;
    }
    .btn_ok {
      background-color: #000;
      color: #fff;
      margin-left: 20px;
    }
  }
}
</style>