import { getProductInfo } from '../../network/shop-details.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {//轮播属性配置
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 500
    },
    pruductInfo:{},//商品具体信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getProductInfo(options);
  },
  getProductInfo(options){
    getProductInfo({
      pid: options.pid,
      type:options.type
    }).then((res)=>{
      this.setData({
        pruductInfo:res.data.data
      });
    });
  },
  checkImg(){ 
    wx.navigateTo({
      url: '/main/pages/check-img/check-img',
    })
  }
})