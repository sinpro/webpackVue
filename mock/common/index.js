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
            name: "ddd",
            age:'23'
          })
        );
      }
    }
]