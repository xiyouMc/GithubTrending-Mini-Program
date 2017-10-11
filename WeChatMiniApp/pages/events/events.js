// pages/events/events.js
var api = require('../../utils/request_api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    created_at: '',
    login: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let events = options.events
    const that = this
    console.log(events)
    wx.request({
      url: api.server_api + 'v1/repos?github=' + events,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        let data = []
        for (var i = 0; i < res.data.length; i++) {
          let item = res.data[i]
          if (item.type == 'WatchEvent') {       
          } else if (item.type == 'ForkEvent') {
            item.payload.action = 'fork'
            item.repo.fork = item.repo.name
            item.repo.name = item.repo.name.replace(item.org.login, item.actor.login)
            item.payload.action2 = 'to'
          } else if (item.type == 'CreateEvent') {
             item.payload.action = 'created repository '
          }
          data.push(item)
        }
        that.setData({
          events: data
        })
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