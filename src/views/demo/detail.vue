<template>
  <div class="wrap">
    <div class="wrap_box">
      <div class="moneyTitle">转账金额（HKD）</div>
      <div class="moneyNum">{{formData.payeeMoneyNum}}</div>
    </div>
    <div class="wrap_info">
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
         payerNum: '567-67-0987-HDK',
        payerName: '67-0987-HDK-定期',
        payeeType: '已登记账户',
        payeeWay: '收款账户',
        payeeNum: '',
        payeeName: 'wenyuge',
        payeeBank: '建设银行',
        payeeMoneyTy: '',
        payeeMoneyNum: '800.00',
        payeeContent: '房租电费'
      },

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
  methods: {
    goComfirm() {
      this.$router.push({
        path: `result`
      });
    },
    recover(){
     this.$router.push({
        path: `demo`
      });
    },
    open() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
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
  .title {
    border-left: 2px solid #cbcaca;
    padding-left: 6px;
    margin-bottom: 40px;
  }
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
  .wrap_box{
    text-align: center;
    .moneyNum{
        font-size: 16px;
    }
  }
  .wrap_info{
    margin-top: 40px;
    .item {
      display: flex;
    }
  }
}
</style>