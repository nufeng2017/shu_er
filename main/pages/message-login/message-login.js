import { sendCode } from '../../network/logs.js';
import utils from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    time:0,
    sendCode:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(utils)
  },
  inputPhone(e){
    this.setData({
      phone: e.detail
    });
  },
  inputCode(e) {
    this.setData({
      code: e.detail
    });
  },
  sendCode(){//发送验证码
    if (this.data.sendCode){
      return;
    } 
    let that = this;
    sendCode({
      phone: this.data.phone,
      type:1
    }).then((res) => {
      if (res.data.result === 0){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      } else {
        that.setData({
          sendCode: true
        });
        that.countDown();
      }
    })
  },
  countDown(){
    console.log(this.data.sendCode)
    let time = 60;
    let timer = setInterval(() => {
      time--;
      this.setData({
        time: time
      })
      if (time <= 0){
        clearInterval(timer);
        this.setData({
          sendCode: false
        })
      }
    },1000);
  },
  wxLogin(){
    wx.redirectTo({
      url: '/main/pages/logs/logs',
    })
  }
})