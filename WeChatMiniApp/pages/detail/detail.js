var api = require('../../utils/request_api.js')
Page({
    hide(){
        this.setData({
            hidden:true
        });
    },
    onLoad(query){
        console.log('show detail')
        console.log(query)
        const link = query.url
        console.log(api.server_api + 'v1/repos?github=' + link)
        this.setData({
            hidden:false
        }); 
        const that = this
         
        wx.request({
          url: api.server_api + 'v1/repos?github=' + link,
          success:function(res){
            console.log(res.data)
            that.setData({
              image_url: res.data.owner.avatar_url
            })
            that.setData({
              repo_name: res.data.name
            })
            that.setData({
              repo_msg: res.data.description
            })
            that.setData({
              stars: res.data.stargazers_count
            })
            that.setData({
              watchers: res.data.watchers_count
            })
            that.setData({
              forks: res.data.forks
            })
            that.setData({
              readme_link: res.data.contents_url
            })
          }
        });
    },
    binderror:function(e){
        console.log(e)
    },
    readme_click(e){
      console.log('click')
      console.log(e.currentTarget.dataset.link.replace('{+path}','README.md'))
    }
    // onShow:function(){
    //     //  在页面展示之后先获取一次数据
    //     var that = this;
    //     GetList(that);
    //     },
})