import Mock from 'mockjs';
import common from './common'; // 公共mock数据

const mocks=[
  ...common, 
]
// const mocks = {
//         intercept: true, // 开关，来使模拟请求与真实请求并存
//         fetchs: common
// }
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
            decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
          '"}'
        ) 
    }
export function mockXHR(){
    Mock.XHR.prototype.proxy_send=Mock.XHR.prototype.send;
    Mock.XHR.prototype.send=function(){
        if(this.custom.xhr){
            this.custom.xhr.withCredentials=this.withCredentials||false;
            if(this.responseType){
                this.custom.xhr.responseType=this.responseType
            }
        }
        this.proxy_send(...arguments)
    }
    function XHR2ExpressReqWrap(respond){
        return function(options){
            let result=null;
            if(respond instanceof Function){
                const { body, type, url}=options;
                result=respond({
                    method:type,
                    body: typeof body ==='string'?JSON.parse(body):body,
                    query: param2Obj(url)
                })
            }else{
                result=respond
            }
            return Mock.mock(result)
        }
    }
    for (const i of mocks) {
        Mock.mock(i.url,i.type||'get',XHR2ExpressReqWrap(i.response))
    }
    // for (const i of mocks) {
    //     if(i.intercept){
    //       for(const fetch of i.fetchs){
    //         Mock.mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response))
    //       }
    //     }
    //   }
}
  
export default mocks;