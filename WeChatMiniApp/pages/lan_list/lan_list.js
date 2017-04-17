Page({
    onLoad(query){
        console.log('show detail')
        console.log(query)
        const link = query.link
        this.setData({
            hidden:false
        }); 
        const that = this;
        this.setData({
            list:[
        "all",
        'html'
    ]
        })
    },
})
wx.navigateBack({
  delta: 2
})