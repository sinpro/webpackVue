import ajax from 'utils/ajax';

//【雷浩】客户信息查询
export const CBBC050060 = data => {
    return ajax({
      url: '/CBBC050060',
      method: 'post',
      data,
      devPreUrl: '/api',
      prodPreUrl: '',
    });
}