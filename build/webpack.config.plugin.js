/**
 * 自定义插件，插入配置的系统常量
 */
function InsertHtmlSiteConfig(options){
    this.options = options;
  }
  
  InsertHtmlSiteConfig.prototype.apply = function(compiler){
    var variableKey = this.options.variableKey,	// 变量key
      variableValue = this.options.variableValue, // 变量value
      nodeMode = this.options.nodeMode;	// 当前环境
    var isDemo = nodeMode === 'demo'; // demo环境
  
  
  
    compiler.plugin('compilation', function(compilation){
      compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        var htmlString = htmlPluginData.html;
        var siteConfigJs = `<script>var ${variableKey}=${JSON.stringify(variableValue)}</script><body>`;
        if(isDemo){
          siteConfigJs = `<script>
            // demo环境设置测试环境和生产环境地址
            var demoModeSetConfig = (function(){
              var isTest = /http:\\/\\/29.3.93.160:9080/.test(window.location.href);
              var nodeConfigs = ${JSON.stringify(variableValue)};
              if(isTest){
                nodeConfigs.login_url = 'http://29.3.93.160:9080/login-demo/index.html#/p/ebank-login';
                nodeConfigs.logout_url = 'http://29.3.93.160:9080/login-demo/index.html#/p/ebank-login';
              }
              return nodeConfigs;
            })();
            var ${variableKey}=demoModeSetConfig;
            </script><body>`;
        }
        htmlPluginData.html = htmlString.replace('<body>', siteConfigJs);
      });
    })
  };
  
  module.exports = InsertHtmlSiteConfig;
  