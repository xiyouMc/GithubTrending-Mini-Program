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
        const link = query.link
        this.setData({
            hidden:false
        }); 
        const that = this
         
         wx.request({
            url:api.server_api + 'capture' + link,
            success:function(res){
                console.log('ressuess' + res.data);
                // hide()
            // var list = that.data;
            // for(var i = 0; i < res.data.length; i++){
            //   list.push(res.data[i]);
            // }
            // that.setData({
            //     list : res.data
            // });
            // page ++;
            console.log("https://python.0x2048.com/" + 'capture' + link);
            // that.setData({
            //     image_url:"https://python.0x2048.com/" + 'capture' + link,
            // })
            that.setData({
                hidden:true
            });
            
            }
        });
    },
    // onShow:function(){
    //     //  在页面展示之后先获取一次数据
    //     var that = this;
    //     GetList(that);
    //     },
})