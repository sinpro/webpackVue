import ajax from 'utils/request';

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
export const CBBC050001 = data => {
    return ajax({
      url: '/CBBC050001',
      method: 'post',
      data,
      devPreUrl: '/api',
      prodPreUrl: '',
    });
}
