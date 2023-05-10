const Mock = require('mockjs');
const { createReturnData } = require('../untils');
export default [
  // 客户信息查询
  {
    url: '/CBBC050060',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock({
          name: 'ddd',
          age: '23'
        })
      );
    }
  },
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
  //货币下拉枚举查询
  {
    url: '/CBBC050005',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock({
          list: [
            {
              label: '法郎',
              value: 'HCK'
            },
            {
              label: '港币',
              value: 'HCO'
            },
            {
              label: '人名币',
              value: 'AAC'
            },
            {
              label: '欧元',
              value: 'GCO'
            }
          ]
        })
      );
    }
  },
  //卖出账号查询
  {
    url: '/CBBC050006',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock({list:[
          {
            payeeCount: '255-20-6108889HKD',
            payeeCardTy: '储蓄帐户',
            payeeName: 'wang daming',
            payeeCanUse: '273727382.27'
          },
          {
            payeeCount: '255-2330-6108889HKD',
            payeeCardTy: '储蓄帐户',
            payeeName: 'daming',
            payeeCanUse: '382.27'
          }
        ]})
      );
    }
  },
  //买入账号查询
  {
    url: '/CBBC050007',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock({list:[
          {
            payerCount: '257-270-6108889HKD',
            payerCardTy: '储蓄帐户',
            payerName: 'daming'
          }
        ]})
      );
    }
  },
  //外币兑换利率查询
  {
    url: '/CBBC050008',
    type: 'post',
    response: function (config) {
      return createReturnData(
        Mock.mock({
          oldPersent:8.85103655,
          persent:6.1510757767
        })
      );
    }
  }
];
