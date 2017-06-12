var api = require('../../utils/request_api.js')
var page =0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
var lan = ['All Language', 'Python', 'C', 'Go', 'HTML', 'Java', 'Shell', 'C++', 'C#', 'Ruby', 'PHP', 'Visual-Basic', 'JavaScript',
  'Swift', 'Groovy'];
var stared;
var star_img;
var star_color = [];
var repo_d;
var GetStared = function (that, res){
  var fuck_username = wx.getStorageSync("fuck_username");
  if (fuck_username) {
    wx.showNavigationBarLoading();
    var repo_data = res.data;
    repo_d = repo_data;
    star_img = new Array(res.data.length)
    stared = [];
    star_color = new Array(res.data.length);
    that.setData({
      stared: stared,
      star_img: star_img,
      star_color: star_color
    })
    var json = ''
    for (var i = 0; i < res.data.length; i++) {
      stared[i] = '';
      star_img[i] = '/assets/like.png'
      that.setData({
        star_img: star_img
      });
      var item = '"' + res.data[i].owner.login + '/' + res.data[i].name + '"';
      if (i < res.data.length - 1) {
        json += item + ',';
      } else {
        json += item;
      }
    }
    json = '[' + json + ']'

    wx.request({
      url: api.server_api + 'v1/star/status?githubs=' + json + '&username=' + fuck_username,
      success: function (e) {
        console.log(e.data)
        for (var star_i = 0; star_i < e.data.length; star_i++) {
          if (e.data[star_i].stared === 'stared') {
            console.log('已经已经已经已经');
            for (var i = 0; i < res.data.length; i++) {
              if (e.data[star_i].repo == (res.data[i].owner.login + '/' + res.data[i].name)) {
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
        wx.hideNavigationBarLoading();
      }
    })
  }
}
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
      console.log(res.data.length);
      that.setData({
        list : res.data
      });
      GetStared(that, res);
      
      that.setData({
        hidden:true
      });
    }
  });
};
Page({
 data:{
  array: lan,
  index:0,
  hidden:true,
  list:[],
  scrollTop : 0,
  scrollHeight:0,
  user_avatar: "/assets/github_default.png",
  stared: stared

 },
 onLoad:function(){
  //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
   var that = this;
   GetList(that);
   wx.getSystemInfo({
     success:function(res){
       console.info(res.windowHeight);
       that.setData({
         scrollHeight:res.windowHeight - 100
       });
     }
   });
   
 },
 onReady:function(){
   try {
     wx.setStorageSync("Python", "python");
     wx.setStorageSync("C", "c");
     wx.setStorageSync("Go", "go");
     wx.setStorageSync("HTML", "html");
     wx.setStorageSync("Java", "java");
     wx.setStorageSync("Shell", "shell");
     wx.setStorageSync("C++", "c%2B%2B");
     wx.setStorageSync("C#", "c#");
     wx.setStorageSync("Ruby", "ruby");
     wx.setStorageSync("PHP", "php");
     wx.setStorageSync("Visual-Basic", "visual-basic");
     wx.setStorageSync("JavaScript", "javascript");
     wx.setStorageSync("Swift", "swift");
     wx.setStorageSync("Groovy", "groovy");
   } catch (e) { }
 },
 onShow:function(){
  try{

    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    var that = this;
    var avatar = wx.getStorageSync("avatar");
    console.log('avatar' + avatar);
    if (avatar){
      that.setData({
        user_avatar: avatar
      })
    }
  }catch(e){}

 },
 bindDownLoad:function(){
  //  该方法绑定了页面滑动到底部的事件
   var that = this;
 },
 scroll:function(event){
   this.setData({
    //  scrollTop : event.detail.scrollTop
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
 bindPickerChange(e){
   var that = this; 
   this.setData({
     index: e.detail.value,
     hidden: false
   });
   stared = [];
   star_img = [];
   star_color = [];
   repo_d = [];
   var language = wx.getStorageSync(lan[e.detail.value])
   wx.request({
     url: api.server_api + 'v1/trending?since=daily&language=' + language,
     method: 'GET',
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
       that.setData({
         list: res.data
       });
       that.setData({
         hidden: true
       });
       GetStared(that,res)
     }
   });

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
       that.setData({
         list: res.data.items
       });
     }
   })
 },
 onShareAppMessage: function () {
   return {
     title: 'Github开源社区小程序版',
     path: '/pages/all_lang/all_lang',
     success: function (res) {
       // 转发成功
     },
     fail: function (res) {
       // 转发失败
     }
   }
 },
 login:function(){
   wx.navigateTo({
     url: '../login/login',
   })
 },
 star_repo:function(e){
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
     stared[index] = '已';
     star_img[index] = '/assets/stared.png';
     star_color[index] = '#3cc51f'
     that.setData({
       stared: stared,
       star_img: star_img,
       star_color: star_color
     })
    wx.request({
      url: api.server_api + 'v1/star?github=' + github_name + '&username=' + fuck_username,
      success:function(e){
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
 comment_repo:function(e){
   const link = e.currentTarget.dataset.link
   wx.showToast({
     title: '敬请期待',
   })
 },
 share_repo:function(e){
   const link = e.currentTarget.dataset.link
   console.log(link)
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
 }
})
