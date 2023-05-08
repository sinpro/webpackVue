<template>
  <div class="wrap">
    <div class="wrap_box">
      <div class="moneyTitle">买入金额（瑞士法郎）</div>
      <div class="moneyNum">50.00</div>
      <!-- <div class="moneyNum">{{ formData.payeeMoneyNum }}</div> -->
      <div class="moneyNum">卖出442.55港元</div>
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
              <div style="display:flex;justify-content:space-around;">
                <div class="text">{{ formData.payeeContent }}</div>
                <div class="text">可用结余：{{ formData.payeeCanUse }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="wrap_btn">
      <div class="btn" @click="recover">上一步</div>
      <div class="btn btn_ok" @click="goComfirm">确认</div>
    </div>
  </div>
</template>

<script>
import { CBBC050001, CBBC050003, CBBC050002 } from 'src/apis/common';
export default {
  data() {
    return {
      formData: {
        payeeCount: '255-20-6108889 HKD储蓄帐户',
        payerCount: '255-20-6108889 HKD储蓄帐户',
        payerMoneyTy: 'HDO',
        payeeMoneyTy: 'HDK',
        payerCanUse: '273727382.27',
        payeeCanUse: '273727382.27',
        payerMoneyNum: '800.00',
        payeeMoneyNum: '800.00',
        payeeContent: '瑞士法郎1 港元 8.85103655-8.37909845'
      },
      payeeTypeList: [],
      payeeWayList: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    };
  },
  created() {
    this.allEnumeration();
    console.log('33333', this.$route.query.formData);
    // this.formData = this.$route.query.formData;
  },
  filters: {
    filterPayeeWay(item) {
      switch (item) {
        case '0':
          return '已登记第三方账户';
          break;

        case '1':
          return '未登记账户';
          break;

        default:
          break;
      }
    },
    filterPayeeType(item) {
      switch (item) {
        case '0':
          return '收款账号';
          break;

        case '1':
          return '电邮地址';
          break;

        case '2':
          return '流动电话';
          break;

        case '3':
          return 'FPS ID';
          break;

        default:
          break;
      }
    }
  },
  methods: {
    allEnumeration() {
      CBBC050003({}).then(res => {
        if (res.header.errorCode === '0') {
          this.payeeTypeList = res.body;
          console.log('shibie1', this.payeeTypeList);
        } else {
          alert(res.header.errorMsg);
        }
      });
      CBBC050001({}).then(res => {
        if (res.header.errorCode === '0') {
          this.payeeWayList = res.body;
          console.log('shibie2', this.payeeWayList);
        } else {
          alert(res.header.errorMsg);
        }
      });
    },
    goComfirm() {
      CBBC050002({ formData: this.formData }).then(res => {
        if (res.header.errorCode === '0') {
          this.$router.push({
            path: `currencyResult`,
            query: {
              result: res.header.errorCode
            }
          });
        } else {
          alert(res.header.errorMsg);
        }
      });
    },
    recover() {
      this.$router.push({
        path: `currency`
      });
    },
    open() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px;
  font-size: 13px;
  .hht-rural-frist {
    display: flex;
    justify-content: center;

    margin-bottom: 16px;

    span {
      text-align: right;
    }
    .hht-input {
      width: 230px;
      margin-left: 10px;
    }
  }
  .wrap_btn {
    margin-top: 40px;
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
}
</style>