import background from '../../assets/img/bg/bg.js';
import { getConsumeLog } from '../../network/shop-record.js';
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
    this.getList();
  },
  getList(){
    getConsumeLog({
      user_id: wx.getStorageSync('user_id')
    }).then((res)=>{
      console.log(res)
    });
  }
})