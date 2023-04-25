const Mock = require('mockjs');
const { createReturnData } = require('../untils');
export default [
    // 一键置灰
    {
      url: '/CBBC050078',
      type: 'post',
      response: function (config) {
        return createReturnData(
          Mock.mock({
            onkgryCd: "1"
          })
        );
      }
    }
]