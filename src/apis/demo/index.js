import ajax from 'utils/request';

export const CBBC050003 = data => {
    return ajax({
      url: '/CBBC050003',
      method: 'post',
      data,
      devPreUrl: '/api',
      prodPreUrl: '',
    });
}
export const CBBC050002 = data => {
    return ajax({
      url: '/CBBC050002',
      method: 'post',
      data,
      devPreUrl: '/api',
      prodPreUrl: '',
    });
}
export const CBBC050004 = data => {
    return ajax({
      url: '/CBBC050004',
      method: 'post',
      data,
      devPreUrl: '/api',
      prodPreUrl: '',
    });
}


