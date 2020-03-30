import { getBusinessContent } from '../../network/webview.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgUrl:'http://sekjce.com/statics/public/img/c_background.jpg',
    c_ccontent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getBusinessContent().then((res)=>{
      this.setData({
        c_ccontent: res.data.data.c_ccontent
      });
    });
  }
})