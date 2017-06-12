// pages/login/login.js
var username = "";
var password = "";
var api = require('../../utils/request_api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    github_src: '/assets/github_default.png',
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var user = wx.getStorageSync("username");
      if (user) {
        var avatar = wx.getStorageSync("avatar");
        this.setData({
          github_src: avatar,
          hidden_login: true
        })
        wx.setNavigationBarTitle({
          title: user,
        })
      }
    } catch (e) { }
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
  username:function(e){
    username = e.detail.value;
  },
  focus_pwd:function(e){
    this.setData({
      focus:true
    })
  },
  password:function(e){
    password = e.detail.value;
    const that = this;
    if (username === "" || password === "") {
      wx.showToast({
        title: '请输入信息',
      })
    } else {
      that.setData({
        hidden: false
      });
      wx.request({
        url: api.server_api + "v1/login?username=" + username + "&password=" + password,
        success: function (res) {
          if (res.data.user === "login_error") {
            wx.showToast({
              title: '账号密码错误',
            })
          } else {
            console.log(res.data.fuck_username);
            try {
              wx.setStorageSync("username", res.data.user);
              wx.setStorageSync("fuck_username", res.data.fuck_username);
              wx.setStorageSync("avatar", res.data.avatar)
            } catch (e) {
              console.log(e)
            }
            that.setData({
              github_src: res.data.avatar,
              hidden_login: true
            });
            wx.setNavigationBarTitle({
              title: res.data.user,
            })
          }
        },
        complete: function () {
          that.setData({
            hidden: true
          })
        }
      })
    }
  },
  ImgTap: function () {
    wx.previewImage({
      current: 'https://python.0x2048.com/v1/image/python_qcode.jpg', // 当前显示图片的http链接
      urls: ['https://python.0x2048.com/v1/image/python_qcode.jpg', ''] // 需要预览的图片http链接列表
    })
  }
})