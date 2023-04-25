import Mock from 'mockjs';
import common from './common'; // 公共mock数据

const mocks=[
  ...common, 
]
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
                    body: typeof body ==='string'?JSON.parse(body):body
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
}
  
export default mocks;