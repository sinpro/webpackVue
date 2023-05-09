 <template>
  <div class="wrap">
    <!-- 提交结果图标和文字 -->
    <el-result :icon="icon" :title="title" subTitle="">
      <!-- 组件插槽 -->
      <template slot="extra">
        <div class="wrap_box">
          <!-- 头部卖出买入金额展示框 -->
          <div class="moneyTitle">参考编号：{{ formData.copyNum }}</div>
          <div class="moneyTitle">
            买入金额（瑞士法郎）{{ formData.payerCanUse }}
          </div>
          <div class="moneyTitle">
            卖出金额（港币）{{ formData.payeeCanUse }}
          </div>
        </div>
        <div class="wrap_info">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <!-- 表单标题 -->
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
            <!-- 买入卖出货币展示 -->
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
            <!-- 买入卖出账号信息展示 -->
            <el-row>
              <el-col :span="12">
                <div class="item">
                  <div class="title">账户</div>
                  <div>
                    <div class="count_text">  {{ formData.payerCount }}&nbsp;&nbsp;{{
                    formData.payerCardTy
                  }}</div>
                    <div class="text">可用结余：{{ formData.payerCanUse }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item">
                  <div class="title">账户</div>
                  <div>
                    <div class="count_text">  {{ formData.payeeCount }}&nbsp;&nbsp;{{
                    formData.payeeCardTy
                  }}</div>
                    <div class="text">可用结余：{{ formData.payeeCanUse }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!-- 附言 -->
            <el-row>
              <el-col :span="24">
                <div class="item">
                  <div class="title">附言</div>
                  <div style="display: flex">
                    <div class="text">
                      {{ formData.payerMoneyTyText }}1=
                      {{ formData.payeeMoneyTyText }}
                      <span class="pensent">{{ formData.oldPensent }}</span
                      ><span>{{ formData.pensent }}</span>
                    </div>
                    <div class="text time">
                      截至{{ formData.nowTime }}香港时间
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 底部按钮组 -->
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
        // payeeCount: '255-20-6108889 HKD储蓄帐户',
        // payerCount: '255-20-6108889 HKD储蓄帐户',
        // payerMoneyTy: 'HDO',
        // payeeMoneyTy: 'HDK',
        // payerCanUse: '82.27',
        // payeeCanUse: '27372.00',
        // payerMoneyNum: '800.00',
        // payeeMoneyNum: '800.00',
        // payeeContent: '瑞士法郎1 港元 8.85103655-8.37909845',
        // copyNum:"09879797777777"
      }
    };
  },
  created() {
    //根据状态展示不同的 icon和文字 (成功、失败)
    if (this.$route.query.result == 0) {
      //成功状态
      this.icon = 'success';
      this.title = '提交成功';
    } else {
      //失败状态
      this.icon = 'error';
      this.title = '提交失败';
    }
      this.formData = this.$route.query.formData;
  },
  methods: {
    //点击【 另一种外币兑换 】按钮
    goComfirm() {
      //跳转外币兑换填写页面
      this.$router.push({
        path: `currency`
      });
    },
    //点击【 返回首页 】按钮
    recover() {
      //返回首页
      this.$router.push({
        path: `currency`
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import './result.scss';
</style>