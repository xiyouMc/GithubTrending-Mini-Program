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
            url:"http://192.168.2.40:9988/" + 'capture' + link,
            success:function(res){
                console.log('ressuess');
                // hide()
            // var list = that.data;
            // for(var i = 0; i < res.data.length; i++){
            //   list.push(res.data[i]);
            // }
            // that.setData({
            //     list : res.data
            // });
            // page ++;
            console.log("http://192.168.2.40:9987/" + 'capture' + link);
            that.setData({
                image_url:"http://192.168.2.40:9987/" + 'capture' + link,
            })
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