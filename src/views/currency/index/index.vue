<template>
  <div class="wrap">
    <div class="wrap_payerBox">
      <div class="title">我要卖出</div>
      <div class="formClass">
        <el-form label-width="90px" :model="formData">
          <div style="display: flex">
            <div class="signClass">*</div>
            <el-form-item label="货币：" class="hht-rural-frist">
              <div>
                <el-select
                  placeholder="请选择"
                  class="hht-input"
                  v-model="formData.payeeMoneyTy"
                  @change="changePayeeMoneyTy"
                >
                  <el-option
                    v-for="(item, index) in moneyTyList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>
          <div style="display: flex">
            <div class="signClass">*</div>
            <el-form-item label="账户：" class="hht-rural-frist other">
              <div style="display: flex">
                <div class="query_count_col">
                  <div
                    v-if="!formData.payeeCount"
                    style="color: rgb(200 204 214); padding-left: 15px"
                  >
                    输出显示
                  </div>
                  <div v-if="formData.payeeCount">
                    <span class="top_text">{{ formData.payeeCount }} </span
                    ><br />
                    <span class="mindle_text"> {{ formData.payeeCardTy }} </span
                    ><br />
                    <span>{{ formData.payeeName }}</span>
                  </div>
                </div>

                <span style="color: blue" @click="open('payee')">账户查询</span>
              </div>
            </el-form-item>
          </div>
          <div class="botText">
            <div v-if="formData.payeeCount">
              可用结余：{{ formData.payeeCanUse }}
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="wrap_payeeBox">
      <div class="title">我要买入</div>
      <div class="formClass">
        <el-form label-width="90px" :model="formData">
          <div style="display: flex">
            <div class="signClass">*</div>
            <el-form-item label="货币：" class="hht-rural-frist">
              <div>
                <el-select
                  placeholder="请选择"
                  class="hht-input"
                  v-model="formData.payerMoneyTy"
                  @change="changePayerMoneyTy"
                >
                  <el-option
                    v-for="(item, index) in moneyTyList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>
          <div style="display: flex">
            <div class="signClass">*</div>
            <el-form-item label="账户：" class="hht-rural-frist">
              <div style="display: flex">
                <div class="query_count_col">
                  <div
                    v-if="!formData.payerCount"
                    style="color: rgb(200 204 214); padding-left: 15px"
                  >
                    输出显示
                  </div>
                  <div v-if="formData.payerCount">
                    <span class="top_text">{{ formData.payerCount }} </span
                    ><br />
                    <span class="mindle_text"> {{ formData.payerCardTy }} </span
                    ><br />
                    <span>{{ formData.payerName }}</span>
                  </div>
                </div>
                <span style="color: blue" @click="open('payer')">账户查询</span>
              </div>
            </el-form-item>
          </div>
          <div class="hht-rural-frist other2" style="display: flex">
            <div style="color: red; margin-top: 12px">*</div>
            <el-select
              placeholder="买入"
              class="buy-input"
              v-model="temp"
              @change="changeType"
            >
              <el-option label="买入" value="0"></el-option>
              <el-option label="卖出" value="1"></el-option>
            </el-select>

            <el-input
              placeholder="请输入"
              v-model="moneyNum"
              class="hht-input other-input"
              collapse-tags
            >
            </el-input>
          </div>
          <div class="botText tip">
            <div v-show="temp == 1" style="font-weight: bold">
              买入 {{ formData.payerMoneyNum }}{{ formData.payerMoneyTyText }}
            </div>
            <div v-show="temp == 0" style="font-weight: bold">
              卖出 {{ formData.payeeMoneyNum }}{{ formData.payeeMoneyTyText }}
            </div>
            <div
              style="margin-top: 10px"
              v-show="formData.payerMoneyTy && formData.payeeMoneyTy"
            >
              {{ formData.payerMoneyTyText }}1 {{ formData.payeeMoneyTyText }}
              <span style="text-decoration: line-through">{{
                formData.oldPensent
              }}</span
              ><span style="color: red">{{ formData.pensent }}</span>
            </div>
            <div style="margin-top: 10px">
              截至{{ formData.nowTime }} 香港时间
              <span style="background-color: #000" @click="changeTime"
                >1212</span
              >
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="wrap_btn">
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
        <div class="search_btn" @click="search">搜索</div>
      </div>
      <el-table
        v-show="this.dialogTy == 'payee'"
        :data="dialogEeData"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="payeeCount" label="账号"> </el-table-column>
        <el-table-column prop="payeeCardTy" label="账号类型"> </el-table-column>
        <el-table-column prop="payeeName" label="账户"> </el-table-column>
        <el-table-column prop="payeeCanUse" label="可用余额"> </el-table-column>
      </el-table>
      <el-table
        v-show="this.dialogTy == 'payer'"
        :data="dialogErData"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="payerCount" label="账号"> </el-table-column>
        <el-table-column prop="payerCardTy" label="账号类型"> </el-table-column>
        <el-table-column prop="payerName" label="账户"> </el-table-column>
      </el-table>
      <div class="comfirm_btn" @click="closeDialog"><div>确定</div></div>
    </el-dialog>
  </div>
</template>

<script>
import {
  CBBC050005,
  CBBC050006,
  CBBC050007,
  CBBC050008
} from 'src/apis/common';
export default {
  data() {
    return {
      dialogTableVisible: false,
      keyWord: '',
      dialogEeData: [],
      dialogErData: [],
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
        payeeContent: '',
        nowTime: '21/04/2023 09:13',
        oldPensent: '',
        pensent: ''
      },
      moneyNum: '',
      payeeSelected: {},
      payerSelected: {},
      payeeWayList: [],
      //货币下拉枚举值
      moneyTyList: [],
      radio: '',
      //买入卖出切换，只用于显示
      temp: '',
      //账号查询弹框类型
      dialogTy: ''
    };
  },
  created() {
    this.allEnumeration();
    console.log('9987', this.$route, this.$route.query.formData);
    // this.formData=this.$route.query.formData
    // if(sessionStorage.getItem("dataObj")){  this.formData=sessionStorage.getItem("dataObj")}
  },
  mounted() {},
  methods: {
    changeType(index) {
      if (index == 0) {
        // this.formData.payeeMoneyNum = this.moneyNum;
        this.$set(this.formData, 'payeeMoneyNum', this.moneyNum);
        console.log(
          'eeee',
          this.formData.payeeMoneyNum,
          this.formData.payerMoneyNum
        );
      } else {
        // this.formData.payerMoneyNum = this.moneyNum;
        this.$set(this.formData, 'payerMoneyNum', this.moneyNum);
        console.log(
          'eeee',
          this.formData.payeeMoneyNum,
          this.formData.payerMoneyNum
        );
      }
    },
    //查询货币兑换利率
    queryPencent() {
      CBBC050008({}).then(res => {
        if (res.header.errorCode === '0') {
          this.formData.oldPensent = res.body.oldPersent;
          this.formData.pensent = res.body.persent;
        } else {
          alert(res.header.errorMsg);
        }
      });
    },
    //下拉框选择卖出的货币
    changePayeeMoneyTy(type) {
      console.log('INDEXSNX', type, this.moneyTyList);
      console.log('检查shigou', Array.isArray(this.moneyTyList));
      this.moneyTyList.forEach(item => {
        console.log('000', this.moneyTyList);
        if (type == item.value) {
          this.formData.payeeMoneyTyText = item.label;
        }
      });
      if (this.formData.payerMoneyTy) {
        this.queryPencent();
      }
    },
    //下拉框选择买入的货币
    changePayerMoneyTy(type) {
      this.moneyTyList.forEach(item => {
        if (type == item.value) {
          this.formData.payerMoneyTyText = item.label;
        }
      });
      if (this.formData.payeeMoneyTy) {
        this.queryPencent();
      }
    },
    changeTime() {
      let obj = new Date();
      let m =
        obj.getMonth() + 1 > 9
          ? obj.getMonth() + 1
          : '0' + (obj.getMonth() + 1);
      let d = obj.getDate() > 9 ? obj.getDate() : '0' + obj.getDate();
      let y = obj.getFullYear();
      let M = obj.getMinutes();
      let h = obj.getHours();
      this.formData.nowTime = `${d}/${m}/${y} ${h}:${M}`;

      this.queryPencent();
    },
    closeDialog() {
      if (this.dialogTy == 'payer') {
        this.formData.payerCount = this.payeeSelected.payerCount;
        this.formData.payerCardTy = this.payeeSelected.payerCardTy;
        this.formData.payerName = this.payeeSelected.payerName;
      } else {
        this.formData.payeeCount = this.payeeSelected.payeeCount;
        this.formData.payeeCardTy = this.payeeSelected.payeeCardTy;
        this.formData.payeeName = this.payeeSelected.payeeName;
        this.formData.payeeCanUse = this.payeeSelected.payeeCanUse;
      }
      this.dialogTableVisible = false;
    },
    allEnumeration() {
      CBBC050005({}).then(res => {
        if (res.header.errorCode === '0') {
          this.moneyTyList = res.body.list;
          console.log(
            '获取币种下拉枚举值',
            Array.isArray(res.body.list),
            res.body
          );
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
      this.payeeSelected = index;
    },
    recover() {
      this.formData = {
        payeeName: '',
        payerName: '',
        payeeMoneyTy: '',
        payerMoneyTy: '',
        payeeCardTy: '',
        payerCardTy: '',
        payeeMoneyNum: '',
        payerMoneyNum: '',
        payeeCanUse: '',
        payerCanUse: '',
        payeeCount: '',
        payerCount: ''
      };
    },
    search() {
      if (this.dialogTy == 'payee') {
        CBBC050006({}).then(res => {
          if (res.header.errorCode === '0') {
            this.dialogEeData = res.body.list;
            console.log('dialogEeData', Array.isArray(res.body));
          } else {
            alert(res.header.errorMsg);
          }
        });
      } else {
        CBBC050007({}).then(res => {
          if (res.header.errorCode === '0') {
            this.dialogErData = res.body.list;
            console.log('dialogErData', res.body);
          } else {
            alert(res.header.errorMsg);
          }
        });
      }
    },
    open(index) {
      this.dialogTy = index;
      if (index == 'payee') {
        CBBC050006({}).then(res => {
          if (res.header.errorCode === '0') {
            this.dialogEeData = res.body.list;
            console.log('dialogEeData', Array.isArray(res.body));
          } else {
            alert(res.header.errorMsg);
          }
        });
      } else {
        CBBC050007({}).then(res => {
          if (res.header.errorCode === '0') {
            this.dialogErData = res.body.list;
            console.log('dialogErData', res.body);
          } else {
            alert(res.header.errorMsg);
          }
        });
      }

      this.dialogTableVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>