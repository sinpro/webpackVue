<template>
  <div class="wrap">
    <!-- 步骤条，后续这里要弄成公共组件 -->
    <div class="step">
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="填写信息"></el-step>
        <el-step title="确认信息"></el-step>
        <el-step title="提交结果"></el-step>
      </el-steps>
    </div>
    <!-- ！！！！！由于面包屑布局所添加的间隔层,后面要删掉-->
    <div style="background-color: #eee; height: 20px"></div>
    <!-- 我要卖出信息相关 -->
    <div class="wrap_payerBox">
      <!-- 左侧标题，后续这里要弄成公共组件 -->
      <div class="title">我要卖出</div>
      <div class="formClass">
        <el-form label-width="90px" :model="formData">
          <div style="display: flex">
            <!-- *必输符号 -->
            <div class="signClass">*</div>
            <el-form-item label="货币：" class="form_item">
              <div>
                <!-- 货币下拉选择 -->
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
            <el-form-item label="账户：" class="form_item other">
              <!-- 账号查询所在行 -->
              <div class="query_count_col">
                <div class="count_col">
                  <!-- 未选择账号 -->
                  <div v-if="!formData.payeeCount" class="default_count">
                    选择账号输出显示
                  </div>
                  <!-- 选择账号 -->
                  <div v-if="formData.payeeCount">
                    <span class="top_text">{{ formData.payeeCount }} </span
                    ><br />
                    <span class="mindle_text"> {{ formData.payeeCardTy }} </span
                    ><br />
                    <span>{{ formData.payeeName }}</span>
                  </div>
                </div>
                <!-- 右侧蓝色文本，弹出弹框 -->
                <span class="count_query" @click="open('payee')">账户查询</span>
              </div>
            </el-form-item>
          </div>
          <!-- 底部可结余显示 -->
          <div class="botText">
            <div v-if="formData.payeeCount">
              可用结余：{{ formData.payeeCanUse }}
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 我要买入相关信息 -->
    <div class="wrap_payeeBox">
      <div class="title">我要买入</div>
      <div class="formClass">
        <el-form label-width="90px" :model="formData">
          <div style="display: flex">
            <div class="signClass">*</div>
            <el-form-item label="货币：" class="form_item">
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
            <el-form-item label="账户：" class="form_item">
              <div style="display: flex">
                <div class="query_count_col">
                  <div class="count_col">
                    <div v-if="!formData.payerCount" class="default_count">
                      选择账号输出显示
                    </div>
                    <div v-if="formData.payerCount">
                      <span class="top_text">{{ formData.payerCount }} </span
                      ><br />
                      <span class="mindle_text">
                        {{ formData.payerCardTy }} </span
                      ><br />
                      <span>{{ formData.payerName }}</span>
                    </div>
                  </div>
                  <span class="count_query" @click="open('payer')"
                    >账户查询</span
                  >
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="form_item other2" style="display: flex">
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
              @blur="inputMoney"
              class="hht-input other-input"
              collapse-tags
            >
            </el-input>
          </div>
          <!-- 底部卖出买入金额展示 -->
          <div class="botText tip">
            <div v-show="temp == 1" style="font-weight: bold">
              买入 {{ formData.payerMoneyNum }}{{ formData.payerMoneyTyText }}
            </div>
            <div v-show="temp == 0" style="font-weight: bold">
              卖出 {{ formData.payeeMoneyNum }}{{ formData.payeeMoneyTyText }}
            </div>
            <!-- 底部兑换利率展示 -->
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
            <!-- 利率查询时间展示，使用香港时间 -->
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
    <!-- 下一步按钮 -->
    <div class="wrap_btn">
      <div class="btn" @click="goComfirm">下一步</div>
    </div>
    <!-- 账户查询弹框 -->
    <el-dialog width="58%" title="账户查询" :visible.sync="dialogTableVisible">
      <!-- 账户查询弹框 搜索行-->
      <div class="search">
        <div>关键词：</div>
        <!-- 输入框 -->
        <el-input
          placeholder="请输入关键词进行搜素"
          class="dialog-input"
          collapse-tags
          v-model="keyWord"
        >
        </el-input>
        <!-- 搜索按钮 -->
        <div class="search_btn" @click="search">搜索</div>
      </div>
      <!-- 账户查询弹框 账号列表-->
      <el-table
        v-show="this.dialogTy == 'payee'"
        :data="dialogEeData"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <!-- 我要卖出账号列表 -->
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
        <!-- 我要买入账号列表 -->
        <el-table-column prop="payerCount" label="账号"> </el-table-column>
        <el-table-column prop="payerCardTy" label="账号类型"> </el-table-column>
        <el-table-column prop="payerName" label="账户"> </el-table-column>
      </el-table>
      <!-- 账户查询弹框 确定按钮-->
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
        payerMoneyTy: '',
        payeeWay: '',
        payeeNum: '',
        payeeName: '',
        payeeBank: '',
        payeeMoneyNum: '',
        payerMoneyNum: '',
        payeeContent: '',
        nowTime: '',
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
      dialogTy: '',
      //账号查询弹框类型
      moneyTy: 0
    };
  },
  created() {
    this.allEnumeration();
     //确认页信息带回填写页
    if (this.$route.query.formData) {
      this.formData = this.$route.query.formData;
    }
  },
  mounted() {},
  methods: {
    // 卖出买入金额输入
    inputMoney() {
      if (this.moneyTy == 0) {
        // 卖出
        this.$set(this.formData, 'payeeMoneyNum', this.moneyNum);
      } else {
        // 买入
        this.$set(this.formData, 'payerMoneyNum', this.moneyNum);
      }
    },
    // 卖出买入切换
    changeType(index) {
      this.moneyTy = index;
      if (index == 0) {
        this.$set(this.formData, 'payeeMoneyNum', this.moneyNum);
        // 清空金额输入框
        this.moneyNum = '';
      } else {
        this.$set(this.formData, 'payerMoneyNum', this.moneyNum);
        this.moneyNum = '';
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
        // 保留选择的卖出货币文字
        if (type == item.value) {
          this.formData.payeeMoneyTyText = item.label;
        }
      });
      if (this.formData.payerMoneyTy) {
        //获取利率
        this.queryPencent();
      }
    },
    //下拉框选择买入的货币
    changePayerMoneyTy(type) {
      this.moneyTyList.forEach(item => {
        // 保留选择的买入货币文字
        if (type == item.value) {
          this.formData.payerMoneyTyText = item.label;
        }
      });
      if (this.formData.payeeMoneyTy) {
        //获取利率
        this.queryPencent();
      }
    },
    //获取系统时间，刷新利率
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
      //接口请求利率
      this.queryPencent();
    },
    closeDialog() {
      // 关闭弹框带出账号反显值
      if (this.dialogTy == 'payer') {
        // 我要买入的
        this.formData.payerCount = this.payeeSelected.payerCount;
        this.formData.payerCardTy = this.payeeSelected.payerCardTy;
        this.formData.payerName = this.payeeSelected.payerName;
      } else {
        // 我要卖出的
        this.formData.payeeCount = this.payeeSelected.payeeCount;
        this.formData.payeeCardTy = this.payeeSelected.payeeCardTy;
        this.formData.payeeName = this.payeeSelected.payeeName;
        this.formData.payeeCanUse = this.payeeSelected.payeeCanUse;
      }
      this.dialogTableVisible = false;
    },
    allEnumeration() {
      // 接口请求货币下拉枚举值
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
      // 表单字段非空校验
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
      if (this.checkEmpty()) {
        return;
      }
      //点击下一步跳转确认页
      this.$router.push({
        path: `currencyComfirm`,
        query: {
          formData: this.formData
        }
      });
    },
    //弹框所选择要回显的账号信息
    handleCurrentChange(index) {
      console.log('000', index);
      this.payeeSelected = index;
    },
    //查询账号列表信息
    search() {
      if (this.dialogTy == 'payee') {
        // 我要卖出的
        CBBC050006({}).then(res => {
          if (res.header.errorCode === '0') {
            this.dialogEeData = res.body.list;
            console.log('dialogEeData', Array.isArray(res.body));
          } else {
            alert(res.header.errorMsg);
          }
        });
      } else {
        // 我要买入的
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
    // 点击账号查询弹框
    open(index) {
      this.dialogTy = index;
      //接口获取账号信息
      if (index == 'payee') {
        // 我要卖出的
        CBBC050006({}).then(res => {
          if (res.header.errorCode === '0') {
            this.dialogEeData = res.body.list;
            console.log('dialogEeData', Array.isArray(res.body));
          } else {
            alert(res.header.errorMsg);
          }
        });
      } else {
        // 我要买入的
        CBBC050007({}).then(res => {
          if (res.header.errorCode === '0') {
            this.dialogErData = res.body.list;
            console.log('dialogErData', res.body);
          } else {
            alert(res.header.errorMsg);
          }
        });
      }
      // 弹出弹框
      this.dialogTableVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>