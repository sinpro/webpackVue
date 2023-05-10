const Mock = require('mockjs');
const { createReturnData } = require('../untils');
export default [
  // 收款人识别方式下拉枚举查询
  {
    url: '/CBBC050001',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock(
          [
            ({
              label: '收款账号',
              value: '0'
            },
            {
              label: '电邮地址',
              value: '1'
            },
            {
              label: '流动电话',
              value: '2'
            },
            {
              label: 'FPS ID',
              value: '3'
            })
          ]
        )
      );
    }
  },
  // 收款人类型下拉枚举查询
  {
    url: '/CBBC050003',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock([
          {
            label: '已登记第三方账户',
            value: '0'
          },
          {
            label: '未登记账户',
            value: '1'
          }
        ])
      );
    }
  },
  //转数快转账提交
  {
    url: '/CBBC050002',
    type: 'post',
    response: function (config) {
      return createReturnData(Mock.mock({}));
    }
  },

  //已登记第三方账号查询
  {
    url: '/CBBC050004',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock([
          {
            bookId: 20230456,
            countNum: 6002445855556554,
            bankName: 'singapore 新加坡',
            bankCode: 'DBS BANK LTD',
            bankNum: 'singapore 新加坡',
            swiftCode: 'swift code BSSSSSGGSGXXX',
            payeeType: '已登记账户',
            payeeWay: '收款账户',
            payeeNum: '',
            payeeName: 'wenyuge',
            payeeBank: '建设银行',
            payeeMoneyTy: '',
            payeeMoneyNum: '800.00',
            payeeContent: '房租电费'
          },
          {
            bookId: 20230456,
            countNum: 6002445855556554,
            bankName: 'singapore 新加坡',
            bankCode: 'DBS BANK LTD',
            bankNum: 'singapore 新加坡',
            swiftCode: 'swift code BSSSSSGGSGXXX',
            payeeType: '已登记账户',
            payeeWay: '收款账户',
            payeeNum: '',
            payeeName: 'wenyuge',
            payeeBank: '建设银行',
            payeeMoneyTy: '',
            payeeMoneyNum: '800.00',
            payeeContent: '房租电费'
          },
          {
            bookId: 20230456,
            countNum: 6002445855556554,
            bankName: 'singapore 新加坡',
            bankCode: 'DBS BANK LTD',
            bankNum: 'singapore 新加坡',
            swiftCode: 'swift code BSSSSSGGSGXXX',
            payeeType: '已登记账户',
            payeeWay: '收款账户',
            payeeNum: '',
            payeeName: 'wenyuge',
            payeeBank: '建设银行',
            payeeMoneyTy: '',
            payeeMoneyNum: '800.00',
            payeeContent: '房租电费'
          }
        ])
      );
    }
  },
  
]