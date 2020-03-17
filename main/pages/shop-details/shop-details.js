// main/pages/shop-details/shop-details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {//轮播属性配置
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 500,
      item: [{
        img: '/main/assets/img/default-avatar.png',
      }, {
        img: '/main/assets/img/default-avatar.png',
      }],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  checkImg(){ 
    wx.navigateTo({
      url: '/main/pages/check-img/check-img',
    })
  }
})