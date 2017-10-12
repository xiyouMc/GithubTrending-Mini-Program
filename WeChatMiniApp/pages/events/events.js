// pages/events/events.js
var api = require('../../utils/request_api.js')
var byTime = [365*24*60*60*1000,24*60*60*1000,60*60*1000,60*1000,1000];  
var unit = ["年","天","小时","分钟","秒钟"]; 

//计算当前事件在几分钟之前
function cal(atime) {
    var ct = new Date().getTime() - atime.getTime();
    if (ct < 0) {
        return "瞎糊闹！"
    }

    console.log(ct)

    var sb = [];
    for (var i = 0; i < byTime.length; i++) {
        if (ct < byTime[i]) {
            continue;
        }
        var temp = Math.floor(ct / byTime[i]);
        ct = ct % byTime[i];
        if (temp > 0) {
            sb.push(temp + unit[i]);
        }


        /*一下控制最多输出几个时间单位： 
            一个时间单位如：N分钟前 
            两个时间单位如：M分钟N秒前 
            三个时间单位如：M年N分钟X秒前 
        以此类推 
        */
        if (sb.length >= 1) {
            break;
        }
    }
    console.log(sb)
    console.log(sb.join("") + "前");
    return sb.join("") + "前"
} 


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
    if (!events) {
      events = 'https://api.github.com/users/' + wx.getStorageSync('username') + '/received_events'
    }
    if (!events) {
      console.log('没登录，跳转到登录')
      return
    }
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
          item.created_at = cal(new Date(item.created_at))
          if (item.type == 'WatchEvent') {
          } else if (item.type == 'ForkEvent') {
            item.payload.action = 'fork'
            item.repo.fork = item.repo.name
            if (item.org) {//如果是fork 的当前用户，则没有org 字段
              item.repo.name = item.repo.name.replace(item.org.login, item.actor.login)
            }
            item.payload.action2 = 'to'
          } else if (item.type == 'CreateEvent') {
            item.payload.action = 'created repository '
          } else if (item.type == 'PushEvent') {
            item.payload.action = 'pushed to '
            item.repo.branch = item.payload.ref
            item.payload.action2 = 'at'
          }
          data.push(item)
        }
        that.setData({
          events: data
        })
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

  actor(e) {
    let user = e.currentTarget.dataset.link
    console.log(user)
    wx.navigateTo({
      url: '../user/userinfo?username=' + user,
      success: function (res) {
        // success
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
  orgRepo(e) {
    wx.navigateTo({
      url: '../detail/detail?url=https://api.github.com/repos/' + e.currentTarget.dataset.link,
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