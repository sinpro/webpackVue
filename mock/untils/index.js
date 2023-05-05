/**
 * 创建公共返回API
 * @param { Any } data
 * @param {string} code
 * @param {string} message
 */
exports.createReturnData = (data, code, message) => {
    if (!data) {
      throw new Error('return data is need');
    }
    return {
      header:{
        iCIFID:"00000",
        errorCode: code || '0',
        errorMsg: message || '请求成功',
      },
      body:{...data},
    };
};