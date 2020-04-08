// main/pages/check-img/check-img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      imgs:JSON.parse(options.imgs),
      index:Number(options.index)
    });
  },

})