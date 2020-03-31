import background from '../../assets/img/bg/bg.js';
import { getCardCode } from '../../network/vip-code.js';
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: background.arcBg,
    card:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCode();
  },
  onShow(){
    timer = setInterval(this.fresh, 30000);
  },
  onUnload: function () {
    clearInterval(timer);
  },
  onHide(){
    clearInterval(timer);
  },
  getCode(fresh){
    getCardCode({
      user_id:wx.getStorageSync('user_id'),
      fresh: fresh
    }).then((res) => {
        this.setData({
          card:res.data.data
        });
    }).catch(()=>{
      wx.showToast({
        title: '抱歉，您还不是会员，请充值！',
        icon:'none'
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '/main/pages/recharge/recharge',
        })
      },2000);
    });
  },
  fresh(){
    this.getCode(1);
  }
})