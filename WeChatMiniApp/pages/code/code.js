var api = require('../../utils/request_api.js')
var wemark = require('../wemark/wemark.js')
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
    wx.request({
      url: api.server_api + 'v1/repos?github=' + readme_link,
      success: function (res) {
        that.setData({
          hidden:true
        })
        const content = Base64.decode(res.data.content)
        wemark.parse(content, that, {
          imageWidth: wx.getSystemInfoSync().windowWidth - 50,
          name: 'wemark'
        })
      }
    })
   
  }
});