var api = require('../../utils/request_api.js')
var WxParse = require('../../wxParse/wxParse.js');
// 需要渲染的Markdown文本
var md = '# hello, world\n\nI love you, wemark!';
var Base64 = require('../../libs/js-base64/base64.modified.js'); 
var readme_link;
Page({
  data: {
    // 确定一个数据名称
    wemark: {}
  },
  onLoad(query){
    this.setData({
      hidden: false
    });
    console.log(query)
    readme_link = query.readme_link
  },
  onReady: function () {
    const that = this
    console.log(api.server_api + 'v1/repos?github=' + readme_link)
    wx.request({
      url: api.server_api + 'v1/repos?github=' + readme_link,
      success: function (res) {
        that.setData({
          hidden:true
        })
        const content = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"> <head> 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 	<title>SyntaxHighlighter Build Test Page</title> 	<script type="text/javascript" src="scripts/shCore.js"></script> 	<script type="text/javascript" src="scripts/shBrushBash.js"></script> 	<script type="text/javascript" src="scripts/shBrushCpp.js"></script> 	<script type="text/javascript" src="scripts/shBrushCSharp.js"></script> 	<script type="text/javascript" src="scripts/shBrushCss.js"></script> 	<script type="text/javascript" src="scripts/shBrushDelphi.js"></script> 	<script type="text/javascript" src="scripts/shBrushDiff.js"></script> 	<script type="text/javascript" src="scripts/shBrushGroovy.js"></script> 	<script type="text/javascript" src="scripts/shBrushJava.js"></script> 	<script type="text/javascript" src="scripts/shBrushJScript.js"></script> 	<script type="text/javascript" src="scripts/shBrushPhp.js"></script> 	<script type="text/javascript" src="scripts/shBrushPlain.js"></script> 	<script type="text/javascript" src="scripts/shBrushPython.js"></script> 	<script type="text/javascript" src="scripts/shBrushRuby.js"></script> 	<script type="text/javascript" src="scripts/shBrushScala.js"></script> 	<script type="text/javascript" src="scripts/shBrushSql.js"></script> 	<script type="text/javascript" src="scripts/shBrushVb.js"></script> 	<script type="text/javascript" src="scripts/shBrushXml.js"></script> 	<link type="text/css" rel="stylesheet" href="styles/shCore.css"/> 	<link type="text/css" rel="stylesheet" href="styles/shThemeDefault.css"/> 	<script type="text/javascript"> 		SyntaxHighlighter.config.clipboardSwf = "scripts/clipboard.swf"; 		SyntaxHighlighter.all(); 	</script> </head>  <body > <h1>SyntaxHihglighter Test</h1> <p>This is a test file to insure that everything is working well.</p>  <pre class="brush: c-sharp;"> function test() : String { 	return 10; } </pre> </html> '
        
        //Base64.decode(res.data.content)
        // wemark.parse(content, that, {
        //   imageWidth: wx.getSystemInfoSync().windowWidth - 50,
        //   name: 'wemark'
        // })
        console.log(content)
        WxParse.wxParse('article', 'html', content, that, 5);
      }
    })
   
  }
});