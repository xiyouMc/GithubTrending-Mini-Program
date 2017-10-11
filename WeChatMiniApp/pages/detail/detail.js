var api = require('../../utils/request_api.js')
var Base64 = require('../../libs/js-base64/base64.modified.js');
var link;

var list_reply = [
  {
    'name': 'xiyouMc',
    'content': 'hah浙大噶不错浙大噶不错浙大噶不错hahhah浙大噶不错hahhah浙大噶不错hahhah浙大噶不错hahhah浙大噶不错hahhah浙大噶不错hahhah浙大噶不错hahhah浙大噶不错hahhah浙大噶不错hah',
    'time': '2017-8-5 12.00',
    'is_reply': true,
    'reply_name': 'mC'
  },
  {
    'name': 'xiyouMc',
    'content': 'hahfadsfsdfhah',
    'time': '2017-8-5 12.00',
    'is_reply': false
  }

]
Page({

  data: {
    isPoping: false,
    animPlus: {},
    animCollect: {},
    animTranspond: {},
  },
  plus: function () {
    if (this.data.isPoping) {
      this.popp();
      this.setData({
        isPoping: false
      })
    } else {
      this.takeback();
      this.setData({
        isPoping: true
      })
    }
  },
  popp: function () {
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationCollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationCollect.translate(-100, -100).rotateZ(180).opacity(1).step();
    animationTranspond.translate(-140, 0).rotateZ(180).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationCollect.export(),
      animTranspond: animationTranspond.export()
    })
  },
  takeback: function () {
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationCollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationCollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationCollect.export(),
      animTranspond: animationTranspond.export()
    })
  },
  hide() {
    this.setData({
      hidden: true
    });
  },
  onLoad(query) {
    console.log('show detail')
    console.log(query)
    link = query.url
    console.log(api.server_api + 'v1/repos?github=' + link)
    this.setData({
      hidden: false,
      list_reply: list_reply,
      star_img: '/assets/like.png',
      star_color: '#030303'
    });
    const that = this

    wx.request({
      url: api.server_api + 'v1/repos?github=' + link,
      success: function (res) {
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
          create_time: res.data.created_at.substring(0, 10),
          size: res.data.size + "KB",
          owner_name: res.data.owner.login
        })
      },
      complete: function (e) {
        that.setData({
          hidden: true
        });
      }

    });
  },
  binderror: function (e) {
    console.log(e)
  },
  readme_click(e) {
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
  code(e) {
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