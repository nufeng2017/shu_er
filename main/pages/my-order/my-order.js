// main/pages/my-order/my-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive:0,
    tabs:['全部','待付款','待收货','待评价','已完成'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  checkDetails(){
    wx.navigateTo({
      url: '/main/pages/order-details/order-details'
    })
  }
})