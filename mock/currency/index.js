const Mock = require('mockjs');
const { createReturnData } = require('../untils');
export default [
  //外币兑换提交
  {
    url: '/CBBC050002',
    type: 'post',
    response: function (config) {
      return createReturnData(Mock.mock({}));
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
