<template>
  <div class="wrap">
    <div class="wrap_payerBox">
      <div class="title">付款人资料</div>
      <el-form label-position="right" ref="form" :model="formData">
        <el-form-item label="*付款账户：" class="hht-rural-frist">
          <el-input
            placeholder="请输入"
            v-model="formData.payerNum"
            class="hht-input"
            collapse-tags
          >
          </el-input>
          <span style="color: blue">账户查询</span>
        </el-form-item>
        <el-form-item label="*账户名称：" class="hht-rural-frist">
          <el-input
            placeholder="请输入"
            v-model="formData.payerName"
            class="hht-input"
            collapse-tags
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="wrap_payeeBox">
      <div class="title">收款人资料</div>
      <el-form label-position="right" :model="formData">
        <el-form-item label="*收款人类型：" class="hht-rural-frist">
          <el-select
            placeholder="请选择"
            class="hht-input"
            v-model="formData.payeeType"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span style="color: blue" @click="open">已登记第三者账户</span>
        </el-form-item>
        <el-form-item label="*收款人识别方式：" class="hht-rural-frist">
          <el-select
            placeholder="请选择"
            class="hht-input"
            v-model="formData.payeeWay"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*收款人账户：" class="hht-rural-frist">
          <el-select
            placeholder="请选择"
            class="hht-input"
            v-model="formData.payeeNum"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*收款人户名：" class="hht-rural-frist">
          <el-input
            placeholder="请输入"
            class="hht-input"
            collapse-tags
            v-model="formData.payeeName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="*收款人银行/机构：" class="hht-rural-frist">
          <el-select
            placeholder="请选择"
            class="hht-input"
            v-model="formData.payeeBank"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*币种：" class="hht-rural-frist">
          <el-select
            placeholder="请选择"
            class="hht-input"
            v-model="formData.payeeMoneyTy"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*转账金额：" class="hht-rural-frist">
          <el-input
            placeholder="请输入"
            class="hht-input"
            collapse-tags
            v-model="formData.payeeMoneyNum"
          >
          </el-input>
          <span>HKD</span>
        </el-form-item>
        <el-form-item label="*附言：" class="hht-rural-frist">
          <el-select
            placeholder="请选择"
            class="hht-input"
            v-model="formData.payeeContent"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="wrap_btn">
      <div class="btn" @click="recover">重设</div>
      <div class="btn btn_ok" @click="goComfirm">下一步</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        payerNum: '',
        payerName: '',
        payeeType: '',
        payeeWay: '',
        payeeNum: '',
        payeeName: '',
        payeeBank: '',
        payeeMoneyTy: '',
        payeeMoneyNum: '',
        payeeContent: ''
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
        path: `detail`
      });
    },
    recover(){
      this.formData= {
        payerNum: '',
        payerName: '',
        payeeType: '',
        payeeWay: '',
        payeeNum: '',
        payeeName: '',
        payeeBank: '',
        payeeMoneyTy: '',
        payeeMoneyNum: '',
        payeeContent: ''
      }
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
  .wrap_payeeBox {
    margin-top: 40px;
    .item {
      display: flex;
    }
  }
}
</style>