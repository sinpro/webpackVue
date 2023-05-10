<template>
  <div class="wrap">
    <div class="wrap_payerBox">
      <div class="title">付款人资料</div>
      <div class="formClass">
        <el-form ref="form" label-width="90px" :model="formData">
          <el-form-item label="*付款账户：" class="hht-rural-frist">
            <div>
              <el-input
                placeholder="请输入"
                v-model="formData.payerNum"
                class="hht-input"
                collapse-tags
              >
              </el-input>
              <span style="color: blue" @click="open">账户查询</span>
            </div>
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
    </div>
    <div class="wrap_payeeBox">
      <div class="title">收款人资料</div>
      <div class="formClass">
        <el-form label-position="right" label-width="140px" :model="formData">
          <el-form-item label="*收款人类型：" class="hht-rural-frist">
            <div>
              <el-select
                placeholder="请选择"
                class="hht-input"
                v-model="formData.payeeType"
              >
                <el-option
                  v-for="(item, index) in payeeTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span style="color: blue" @click="open">已登记第三者账户</span>
            </div>
          </el-form-item>
          <el-form-item label="*收款人识别方式：" class="hht-rural-frist">
            <el-select
              placeholder="请选择"
              class="hht-input"
              v-model="formData.payeeWay"
            >
              <el-option
                v-for="(item, index) in payeeWayList"
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
            <div>
              <el-input
                type="number"
                placeholder="请输入"
                class="hht-input"
                collapse-tags
                v-model="formData.payeeMoneyNum"
              >
              </el-input>
              <span>HKD</span>
            </div>
          </el-form-item>
          <el-form-item label="附言：" class="hht-rural-frist">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              class="hht-input"
              v-model="formData.payeeContent"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="wrap_btn">
      <div class="btn" @click="recover">重设</div>
      <div class="btn btn_ok" @click="goComfirm">下一步</div>
    </div>
    <el-dialog
      width="58%"
      title="已登记第三者用户"
      :visible.sync="dialogTableVisible"
    >
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
      <div v-if="gridData.length!=0">
        <div class="list_box" v-for="(item, index) in gridData" :key="index">
          <div class="list_item">
            <el-radio style="margin-top: 12px" v-model="radio" :label="index"
              >&nbsp;</el-radio
            >
            <div class="centerText">
              <div class="top">{{ item.countNum }}</div>
              <div>
                【{{ item.bankName }}】{{ item.bankCode }} | {{ item.bankNum }}
              </div>
              <div class="bottom">{{ item.swiftCode }}</div>
            </div>
            <div class="rightText">
              <span>登记编号</span>
              <div>{{ item.bookId }}</div>
            </div>
          </div>
          <hr class="height:1px" />
        </div>
        <div class="btn" @click="closeDialog"><div>确定</div></div>
      </div>
      <div v-else>
        <el-empty description="暂无账号数据"></el-empty>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { CBBC050003, CBBC050001, CBBC050004 } from 'src/apis/common';
export default {
  data() {
    return {
      dialogTableVisible: false,
      keyWord: '',
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
      payeeWayList: [],
      payeeTypeList: [],
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
      ],
      gridData: [],
      radio: ''
    };
  },
  created() {
      console.log("6666",this.$route);
    this.allEnumeration();
  },
  methods: {
    closeDialog() {
      this.dialogTableVisible = false;
    },
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
    checkEmpty() {
      console.log('检查字段', this.formData);
      if (this.formData.payerNum == '') {
        this.$message({
          message: '付款账户是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payerName == '') {
        this.$message({
          message: '账户名称是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payeeType == '') {
        this.$message({
          message: '收款人类型是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payeeWay == '') {
        this.$message({
          message: '收款人识别方式是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payeeNum == '') {
        this.$message({
          message: '收款人账户是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payeeName == '') {
        this.$message({
          message: '收款人户名是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payeeBank == '') {
        this.$message({
          message: '收款人银行/机构是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payeeMoneyTy == '') {
        this.$message({
          message: '币种是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      if (this.formData.payeeMoneyNum == '') {
        this.$message({
          message: '转账金额是必输项,不能为空',
          type: 'warning'
        });
        return true;
      }
      return false;
    },
    goComfirm() {
      if (this.checkEmpty()) {
        return;
      }
      this.$router.push({
        path: `detail`,
        query: {
          formData: this.formData
        }
      });
    },
    recover() {
      this.formData = {
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
      };
    },
    open() {
      CBBC050004({}).then(res => {
        if (res.header.errorCode === '0') {
          this.gridData = res.body;
          console.log('shibie2', this.gridData);
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