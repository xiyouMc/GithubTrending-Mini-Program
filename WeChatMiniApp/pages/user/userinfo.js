// pages/user/userinfo.js
var api = require('../../utils/request_api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_avatar: '',
    user_name: '',
    user_desc: '',
    followers: 0,
    following: 0,
    events: '',
    gists_url: '',
    organizations_url: '',
    repos_url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const name = options.username
    console.log(api.server_api + 'v1/repos?github=https://api.github.com/users/' + name)
    const that = this

    wx.request({
      url: api.server_api + 'v1/repos?github=https://api.github.com/users/' + name,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          user_avatar: res.data.avatar_url,
          user_name: res.data.login,
          user_desc: res.data.bio,
          followers: res.data.followers,
          following: res.data.following,
          gists_url: res.data.gists_url,
          organizations_url: res.data.organizations_url,
          repos_url: res.data.repos_url
        })

        if (wx.getStorageSync('username') == name) {
          that.setData({
            events: res.data.received_events_url,
          })
        } else {
          that.setData({
            events: res.data.events_url.replace('{/privacy}', ''),
          })
        }
      },
      fail: function () {
        // fail
        console.log('fail')
      },
      complete: function () {
        // complete
      }
    })
  },

  events(e) {
    wx.navigateTo({
      url: '../events/events?events=' + e.currentTarget.dataset.link,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
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

  }
})