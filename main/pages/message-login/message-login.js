import { sendCode, loginByCode } from '../../network/logs.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    time:0,
    sendCode:false,
    isRead: true//是否已经阅读协议
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      that.countDown();
      console.log(res)
    })
  },
  countDown(){//短信倒计时
    this.setData({
      sendCode: true
    });
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
  login(){//登录
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          loginByCode({
            phone:that.data.phone,
            code:that.data.code,
            wx_code:res.code
          }).then((res) => {
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            });
            setStorage('user_id', res.data.data.user_id);
            that.closeLoginPage();
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }               
      },
      fail(err){
        wx.showToast({
          title:'无网络连接',
          icon:'none'
        });
      }
    })
  },
  closeLoginPage() {
    wx.navigateBack();
  },
  wxLogin(){
    wx.redirectTo({
      url: '/main/pages/logs/logs',
    })
  },
  onChange(event) {
    this.setData({
      isRead: event.detail
    });
  },
})