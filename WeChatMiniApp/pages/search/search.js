var api = require('../../utils/request_api.js')
var WxSearch = require('../../wxSearch/wxSearch.js')
// pages/search/search.js
var search_q = "";
var stared;
var star_img;
var star_color = [];
var repo_d;
var GetStared = function (that, res) {
  that.setData({
    scrollTop: 0
  })

  star_img = new Array(res.length)
  stared = [];
  star_color = new Array(res.length);
  that.setData({
    stared: stared,
    star_img: star_img,
    star_color: star_color
  })
  var json = ''
  for (var i = 0; i < res.length; i++) {
    stared[i] = '';
    star_img[i] = '/assets/like.png'
    that.setData({
      star_img: star_img
    });
    var item = '"' + res[i].owner.login + '/' + res[i].name + '"';
    if (i < res.length - 1) {
      json += item + ',';
    } else {
      json += item;
    }
  }
  json = '[' + json + ']'

  var fuck_username = wx.getStorageSync("fuck_username");
  console.log(fuck_username)
  console.log(res)
  if (fuck_username) {
    wx.showNavigationBarLoading();
    var repo_data = res;
    repo_d = repo_data;
    wx.request({
      url: api.server_api + 'v1/star/status?githubs=' + json + '&username=' + fuck_username,
      success: function (e) {
        console.log(e.data)
        for (var star_i = 0; star_i < e.data.length; star_i++) {
          if (e.data[star_i].stared === 'stared') {
            console.log('已经已经已经已经');
            for (var i = 0; i < res.length; i++) {
              if (e.data[star_i].repo == (res[i].owner.login + '/' + res[i].name)) {
                stared[i] = '已';
                star_img[i] = '/assets/stared.png';
                star_color[i] = '#3cc51f'
                that.setData({
                  stared: stared,
                  star_img: star_img,
                  star_color: star_color
                })
              }
            }
          }
        }
      },
      complete:function(){
        wx.hideNavigationBarLoading()
      }
    })
  }
}

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    user_avatar: "/assets/github_default.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.setData({
      hidden: true
    })
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  cellTap(e) {
    console.log('click')
    console.log(e.currentTarget.dataset.link)
    const link = e.currentTarget.dataset.link
    wx.navigateTo({
      url: '../detail/detail?url=' + link,
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
  searchGithub: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    const search_q = e.detail.value;
    console.log(search_q)
    
    if (search_q == '') {
      wx.showToast({
        title: '请输入',
        icon: '',
        image: '',
        duration: 0,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      that.setData({
        hidden: false
      });
      console.log(api.server_api + "v1/repos/search?q=" + search_q + "Requests!!!!!!!!!!!!")
      wx.request({
        url: api.server_api + "v1/repos/search?q=" + search_q,
        success: function (res) {
          that.setData({
            hidden: true
          });
          console.info(res.data);
          that.setData({
            list: res.data.items
          });
          GetStared(that, res.data.items);
        }
      })
    }
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    search_q = e.detail.value;
   
    if(search_q == ''){
      wx.showToast({
        title: '请输入',
        icon: '',
        image: '',
        duration: 0,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      that.setData({
        hidden: false
      });
      console.log(api.server_api + "v1/repos/search?q=" + search_q + "Requests!!!!!!!!!!!!")
      wx.request({
        url: api.server_api + "v1/repos/search?q=" + search_q,
        success: function (res) {
          that.setData({
            hidden: true
          });
          console.info(res.data);
          that.setData({
            list: res.data.items
          });
          GetStared(that, res.data.items);
        }
      })
    } 
  },
  
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  star_repo: function (e) {
    if (!repo_d) {
      wx.showToast({
        title: '请先登录！！！',
      })
      wx.navigateTo({
        url: '../login/login',
      });
      return;
    }
    var that = this;
    const index = e.currentTarget.dataset.link;
    console.log(index);
    //  this.animation.rotate(45).scale(2, 2).step()
    //  const new_anim = 'animationData' + link;
    //  this.setData({
    //    new_anim: this.animation.export()
    //  })
    const github_name = repo_d[index].owner.login + '/' + repo_d[index].name
    var fuck_username = wx.getStorageSync("fuck_username");
    if (fuck_username) {

      if (stared[index] == '已') {
        stared[index] = ''
        star_img[index] = '/assets/like.png'
        star_color[index] = '#030303'
        that.setData({
          stared: stared,
          star_img: star_img,
          star_color: star_color
        })
        wx.request({
          url: api.server_api + 'v1/unstar?github=' +
          github_name + '&username=' + fuck_username,
          success: function (e) {
            console.log(e.data)
            repo_d[index].stargazers_count = repo_d[index].stargazers_count - 1;
            that.setData({
              list: repo_d
            })
            wx.showToast({
              title: 'UnStar',
            })
            console.log(repo_d[index].stargazers_count)
          }
        })
        return;
      }

      stared[index] = '已';
      star_img[index] = '/assets/stared.png';
      star_color[index] = '#3cc51f'
      that.setData({
        stared: stared,
        star_img: star_img,
        star_color: star_color
      })
      console.log(api.server_api + 'v1/star?github=' + github_name + '&username=' + fuck_username)
      wx.request({
        url: api.server_api + 'v1/star?github=' + github_name + '&username=' + fuck_username,
        success: function (e) {
          console.log(e.data)
          repo_d[index].stargazers_count = repo_d[index].stargazers_count + 1;
          that.setData({
            list: repo_d
          })
          wx.showToast({
            title: 'Star',
          })
          console.log(repo_d[index].stargazers_count)
        }
      })
    }
  },
  comment_repo: function (e) {
    const link = e.currentTarget.dataset.link
    wx.showToast({
      title: '敬请期待',
    })
  },
  share_repo: function (e) {
    const link = e.currentTarget.dataset.link
    console.log(link)
    wx.navigateTo({
      url: '../detail/detail?url=' + link,
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
  }
})