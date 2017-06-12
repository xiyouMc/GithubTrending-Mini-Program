var api = require('../../utils/request_api.js')
var Base64 = require('../../libs/js-base64/base64.modified.js'); 
var link;
Page({
    hide(){
        this.setData({
            hidden:true
        });
    },
    onLoad(query){
        console.log('show detail')
        console.log(query)
        link = query.url
        console.log(api.server_api + 'v1/repos?github=' + link)
        this.setData({
            hidden:false
        }); 
        const that = this
         
        wx.request({
          url: api.server_api + 'v1/repos?github=' + link,
          success:function(res){
            that.setData({
             
            }); 
            console.log(res.data)
            that.setData({
              hidden: true,
              image_url: res.data.owner.avatar_url,
              repo_name: res.data.name,
              repo_msg: res.data.description,
              stars: res.data.stargazers_count,
              watchers: res.data.subscribers_count,
              forks: res.data.forks,
              readme_link: res.data.contents_url,
              private: res.data.private == false ? "Public" : "Private",
              lan: res.data.language,
              create_time: res.data.created_at.substring(0,10),
              size: res.data.size + "KB",
              owner_name: res.data.owner.login
            })
          }
        });
    },
    binderror:function(e){
        console.log(e)
    },
    readme_click(e){
      console.log('click')
      const readme_link = e.currentTarget.dataset.link.replace('{+path}', 'README.md')
      console.log(readme_link)
      wx.navigateTo({
        url: '../code/code?readme_link=' + readme_link,
        success: function (res) {
          // success
          console.log(res.data)
        },
        fail: function (res) {
          // fail
          console.log(res.data)
        },
        complete: function (res) {
          // complete
          console.log(res.data)
        }
      })
    },
    code(e){
      wx.showToast({
        title: '敬请期待',
        duration: 2000
      })
    },
    onShareAppMessage: function () {
      return {
        title: '这个代码很牛逼!!!',
        path: '/pages/detail/detail?url=' + link,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
    // onShow:function(){
    //     //  在页面展示之后先获取一次数据
    //     var that = this;
    //     GetList(that);
    //     },
})