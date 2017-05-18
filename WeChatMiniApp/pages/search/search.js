var api = require('../../utils/request_api.js')
var WxSearch = require('../../wxSearch/wxSearch.js')
// pages/search/search.js
var search_q = "";
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
  
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
    WxSearch.wxSearchAddHisKey(that);
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
      }
    })
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    search_q = e.detail.value;
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
})