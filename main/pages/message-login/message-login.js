import { sendCode, loginByCode } from '../../network/logs.js';
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
    this.countDown();
    let that = this;
    sendCode({
      phone: this.data.phone,
      type:1
    }).then((res) => {
      console.log(res)
    })
  },
  countDown(){//短信倒计时
    console.log(this.data.sendCode)
    this.setData({
      sendCode: true
    });
    let time = 10;
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
            openid:res.code
          }).then((res) => {
            console.log(res)
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
  wxLogin(){
    wx.redirectTo({
      url: '/main/pages/logs/logs',
    })
  }
})