import background from '../../assets/img/bg/bg.js';
import { getCardCode } from '../../network/vip-code.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: background.arcBg,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCode();
  },
  getCode(){
    getCardCode({
      user_id:wx.getStorageSync('user_id')
    }).then((res) => {
        
    });
  }
})