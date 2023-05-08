<template>
  <div class="wrap">
    <div class="wrap_payerBox">
      <div class="title">我要卖出</div>
      <div class="formClass">
        <el-form ref="form" label-width="90px" :model="formData">
          <div style="display: flex">
            <div style="color: red; margin-top: 12px; margin-right: -27px">
              *
            </div>
            <el-form-item label="货币：" class="hht-rural-frist">
              <div>
                <el-select
                  placeholder="请选择"
                  class="hht-input"
                  v-model="formData.payeeMoneyTy"
                >
                  <el-option
                    v-for="(item, index) in payeeMoneyTyList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>
          <div style="display: flex;">
            <div style="color: red; margin-top: 12px; margin-right: -27px">
              *
            </div>
            <el-form-item label="账户：" class="hht-rural-frist other" >
              <div>
                <el-input
                  type="textarea"
                  placeholder="请输入"
                  v-model="formData.payeeName"
                  class="hht-input"
                  collapse-tags
                >
                </el-input>
                <span style="color: blue" @click="open">账户查询</span>
              </div>
            </el-form-item>
          </div>
          <div class="botText" >
            <div>可用结余：98,765,402.87</div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="wrap_payeeBox">
      <div class="title">我要买入</div>
      <div class="formClass">
        <el-form ref="form" label-width="90px" :model="formData">
          <div style="display: flex">
            <div style="color: red; margin-top: 12px; margin-right: -27px">
              *
            </div>
            <el-form-item label="货币：" class="hht-rural-frist">
              <div>
                <el-select
                  placeholder="请选择"
                  class="hht-input"
                  v-model="formData.payerMoneyTy"
                >
                  <el-option
                    v-for="(item, index) in payeeMoneyTyList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>
          <div style="display: flex">
            <div style="color: red; margin-top: 12px; margin-right: -27px">
              *
            </div>
            <el-form-item label="账户：" class="hht-rural-frist">
              <div>
                <el-input
                  type="textarea"
                  placeholder="请输入"
                  v-model="formData.payerName"
                  class="hht-input"
                  collapse-tags
                >
                </el-input>
                <span style="color: blue" @click="open">账户查询</span>
              </div>
            </el-form-item>
          </div>
          <div class="hht-rural-frist" style="display: flex">
            <div style="color: red; margin-top: 12px">*</div>

            <el-select
              placeholder="买入"
              class="buy-input"
              v-model="formData.payerMoneyTy"
            >
              <el-option label="卖入" value="1"></el-option>
              <el-option label="卖出" value="1"></el-option>
            </el-select>

            <el-input
              placeholder="请输入"
              v-model="formData.payeeName"
              class="hht-input"
              collapse-tags
            >
            </el-input>
          </div>
          <div class="botText">
            <div style="font-weight: bold">卖出 442.55港元</div>
            <div style="margin-top: 10px">
        瑞士法郎1    港元 8.85103655-8.85103655
            </div>
            <div style="margin-top: 10px">截至21/04/2023 09:13 香港时间</div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="wrap_btn">
      <!-- <div class="btn" @click="recover">重设</div> -->
      <div class="btn btn_ok" @click="goComfirm">下一步</div>
    </div>
    <el-dialog width="58%" title="账户查询" :visible.sync="dialogTableVisible">
      <div class="search">
        <div>关键词：</div>
        <el-input
          placeholder="请输入关键词进行搜素"
          class="dialog-input"
          collapse-tags
          v-model="keyWord"
        >
        </el-input>
        <div class="btn">搜素</div>
      </div>
    
        <el-table
          :data="dialogData"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="date" label="账号"> </el-table-column>
          <el-table-column prop="name" label="账号类型"> </el-table-column>
          <el-table-column prop="address" label="账户"> </el-table-column>
          <el-table-column prop="use" label="可用余额"> </el-table-column>
        </el-table>
        <div class="btn" @click="closeDialog"><div>确定</div></div>
    
    </el-dialog>
  </div>
</template>

<script>
import { CBBC050005, CBBC050006 } from 'src/apis/common';
export default {
  data() {
    return {
      dialogTableVisible: false,
      keyWord: '',
      dialogData: [
        {
          date: 'asdasd',
          name: 'asdasd',
          address: 'asdasd',
          use: 'asdasd'
        },
        {
          date: 'asdasd',
          name: 'asdasd',
          address: 'asdasd',
          use: 'asdasd'
        },
        {
          date: 'asdasd',
          name: 'asdasd',
          address: 'asdasd',
          use: 'asdasd'
        }
      ],
      formData: {
        payeeName: '',
        payerName: '',
        payeeMoneyTy: '',
        payeeWay: '',
        payeeNum: '',
        payeeName: '',
        payeeBank: '',
        payeeMoneyTy: '',
        payeeMoneyNum: '',
        payeeContent: ''
      },
      payeeWayList: [],
      payeeMoneyTyList: [],
      radio: ''
    };
  },
  created() {
    console.log('6666', this.$route);
    this.allEnumeration();
  },
  methods: {
    closeDialog() {
      this.dialogTableVisible = false;
    },
    allEnumeration() {
      CBBC050005({}).then(res => {
        if (res.header.errorCode === '0') {
          this.payeeMoneyTyList = res.body;
          console.log('获取币种下拉枚举值', this.payeeMoneyTyList);
          console.log('shibie1', res.body);
        } else {
          alert(res.header.errorMsg);
        }
      });
    },
    checkEmpty() {
      console.log('检查字段', this.formData);
      if (this.formData.payeeName == '') {
        this.$message({
          message: '买入卖出金额是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }

      if (this.formData.payeeName == '') {
        this.$message({
          message: '卖出账号是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }

      if (this.formData.payeeMoneyTy == '') {
        this.$message({
          message: '卖出币种是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payerName == '') {
        this.$message({
          message: '买入账号是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }

      if (this.formData.payerMoneyTy == '') {
        this.$message({
          message: '买入币种是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }

      return false;
    },
    goComfirm() {
      // if (this.checkEmpty()) {
      //   return;
      // }
      this.$router.push({
        path: `currencyComfirm`,
        query: {
          formData: this.formData
        }
      });
    },
    handleCurrentChange(index) {
      console.log('000', index);
    },
    recover() {
      this.formData = {
        payeeName: '',
        payerName: '',
        payeeMoneyTy: '',
        payeeWay: '',
        payeeNum: '',
        payeeName: '',
        payeeBank: '',
        payeeMoneyTy: '',
        payeeMoneyNum: '',
        payeeContent: ''
      };
    },
    open() {
      CBBC050006({}).then(res => {
        if (res.header.errorCode === '0') {
          // this.dialogData = res.body;
          console.log('shibie2', res.body);
        } else {
          alert(res.header.errorMsg);
        }
      });
      this.dialogTableVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  .hht-rural-frist {
    .hht-input {
      width: 230px;
      margin-left: 10px;
    }
    .buy-input {
      /deep/ .el-input {
        .el-input__inner {
          border: none;
          width: 77px;
          padding: 0;
          margin-left: -1 3px;
        }
        .el-input__suffix {
          .el-icon-arrow-up {
            // margin-left: -69px;
          }
        }
      }
    }
  }
  .other{
    margin-bottom: 8px;
  }
  .botText {
    margin-left: 80px;
    // margin-top: 12px;
  }
  .title {
    border-left: 2px solid #d8d7d7;
    padding-left: 6px;
  }
  .formClass {
    display: flex;
    align-items: center;
    flex-direction: column;
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
 .wrap_payeeBox{
  margin-top: 20px;
 }
  /deep/.el-dialog__wrapper {
    .el-dialog__header {
      background-color: rgb(197, 196, 196);
    }
  }
  .search {
    display: flex;
    .dialog-input {
      width: 230px;
      // margin-top: -10px;
    }
    .btn {
      // border-radius: 4px;
      // width: 80px;
      // height: 26px;
      // line-height: 26px;
      background-color: #000;
      color: #fff;
    }
  }
  .list_box {
    margin: 20px 0;
    .list_item {
      display: flex;
      justify-content: space-between;
      .centerText {
        margin-left: -103px;
        .top {
          font-weight: bold;
          margin-bottom: 8px;
        }
        .bottom {
          margin-top: 10px;
          border: 1px solid #f9ce84;
          background-color: #f3edd8;
          color: #f9ce84;
        }
      }
      .rightText {
        margin-top: 8px;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    
    margin-top: 30px;
    div {
      border-radius: 4px;
      width: 150px;
      height: 26px;
      line-height: 26px;
      background-color: #000;
      color: #fff;
      text-align: center;
    }
  }
}
</style>