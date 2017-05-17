var api = require('../../utils/request_api.js')
var WxSearch = require('../wxSearch/wxSearch.js')
var page =0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
var search_q = "";
  
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function(that){
  that.setData({
    hidden:false
  });
  wx.request({
    url: api.server_api + 'v1/trending?since=daily',
    method:'GET',
    header: {
      'content-type': 'application/json'
    },
    success:function(res){
      console.info(res.data);
      that.setData({
        list : res.data
      });
      page ++;
      that.setData({
        hidden:true
      });
    }
  });
}
Page({
 data:{
  hidden:true,
  list:[],
  scrollTop : 0,
  scrollHeight:0
 },
//  onPullDownRefresh: function(){
//     wx.stopPullDownRefresh();
//     GetList(this);
//   },
 onLoad:function(){
  //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
   var that = this;
   GetList(that);
   wx.getSystemInfo({
     success:function(res){
       console.info(res.windowHeight);
       that.setData({
         scrollHeight:res.windowHeight
       });
     }
   });
   //初始化的时候渲染wxSearchdata
   WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
   WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
 },
 onShow:function(){
  //  在页面展示之后先获取一次数据
 },
 bindDownLoad:function(){
  //  该方法绑定了页面滑动到底部的事件
   var that = this;
  //  GetList(that);
 },
 scroll:function(event){
  //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
   this.setData({
     scrollTop : event.detail.scrollTop
   });
 },
 selectLanguage(e){
wx.navigateTo({
  url: '../lan_list/lan_list',
  success: function(res){
    // success
  },
  fail: function(res) {
    // fail
  },
  complete: function(res) {
    // complete
  }
})
 },
 cellTap(e){
  console.log('click')
  console.log(e.currentTarget.dataset.link)
  const link = e.currentTarget.dataset.link
  wx.navigateTo({
    url: '../detail/detail?url=' + link,
    success: function(res){
      // success
      console.log(res.data)
    },
    fail: function(res) {
      // fail
      console.log(res.data)
    },
    complete: function(res) {
      // complete
      console.log(res.data)
    }
  })
 },
 onPullDownRefresh: function () {
   console.log("下拉")
 },
 wxSearchFn: function (e) {
   var that = this
   WxSearch.wxSearchAddHisKey(that);
   that.setData({
     hidden: false
   });
   console.log(e.data + "Requests!!!!!!!!!!!!")
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
 }
//  ,
//  refresh:function(event){
//   //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
//    page = 0;
//    this.setData({
//      list : [],
//      scrollTop : 0
//    });
//    GetList(this)
//  }
})
