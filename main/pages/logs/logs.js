import { loginByWeixinPhone } from '../../network/logs.js'
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    isRead:true//是否已经阅读协议
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLoginCode();
  },
  onChange(event) {
    this.setData({
      isRead: event.detail
    });
  },
  getLoginCode(){
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code:res.code
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail(err) {
        wx.showToast({
          title: '无网络连接',
          icon: 'none'
        });
      }
    })
  },
  getUserInfoLogin(e){
    var that = this;
    if (e.detail.iv){
      let encryptedData = e.detail.encryptedData;
      let iv = e.detail.iv;
      loginByWeixinPhone({
        code: this.data.code,
        iv: iv,
        encryptedData: encryptedData
      }).then((res) => {
        wx.showToast({
          title: '登录成功',
          icon:'none'
        });
        setStorage('user_id',res.data.data.user_id);
        setStorage('user_info', res.data.data);
        that.closeLoginPage();
      })
    } 
  },
  closeLoginPage(){
    wx.navigateBack();
  },
  messageLogin(e){
    wx.redirectTo({
      url: '/main/pages/message-login/message-login',
    })
  },
  
})