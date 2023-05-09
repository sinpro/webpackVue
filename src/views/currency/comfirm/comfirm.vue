<template>
  <div class="wrap">
    <!-- 头部卖出买入金额信息展示 -->
    <div class="wrap_box">
      <div class="moneyTitle">买入金额（{{formData.payerMoneyTyText }}）</div>
      <div class="moneyNum sell">{{ formData.payerMoneyNum }}</div>
      <div class="moneyNum">卖出{{ formData.payeeMoneyNum }}{{ formData.payeeMoneyTyText }}</div>
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
                <div class="count_text">
                  {{ formData.payerCount }}&nbsp;&nbsp;{{
                    formData.payeeCardTy
                  }}
                </div>
                <div class="text">可用结余：{{ formData.payerCanUse }}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <div class="title">账户</div>
              <div>
                <div class="count_text">
                  {{ formData.payeeCount }}&nbsp;&nbsp;{{
                    formData.payeeCardTy
                  }}
                </div>
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
              <div style="display: flex; justify-content: space-between">
                <div class="text">
                  {{ formData.payerMoneyTyText }}1=
                  {{ formData.payeeMoneyTyText }}
                  <span class="pensent">{{ formData.oldPensent }}</span
                  ><span>{{ formData.pensent }}</span>
                </div>
                <div class="text time">截至{{ formData.nowTime }}香港时间</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 底部按钮组 -->
    <div class="wrap_btn">
      <div class="btn" @click="recover">上一步</div>
      <div class="btn btn_ok" @click="goComfirm">确认</div>
    </div>
  </div>
</template>

<script>
import { CBBC050002 } from 'src/apis/common';
export default {
  data() {
    return {
      //表单数据集合
      formData: {}
    };
  },
  created() {
    //接受填写页数据初始化页面
    console.log('33333', this.$route.query.formData);
    this.formData = this.$route.query.formData;
  },
  methods: {
    //点击【 确认 】按钮
    goComfirm() {
      CBBC050002({ formData: this.formData }).then(res => {
        if (res.header.errorCode === '0') {
          //跳转到提交结果页
          this.$router.push({
            path: `currencyResult`,
            //用于结果页成功失败状态的标识
            query: {
              result: res.header.errorCode,
              formData: this.formData
            }
          });
        } else {
          //处理接口异常
          alert(res.header.errorMsg);
        }
      });
    },
    //点击【 上一步 】按钮
    recover() {
      //跳转到外币兑换填写信息页面
      this.$router.push({
        path: `currency`,
        query: {
          formData: this.formData
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './comfirm.scss';
</style>