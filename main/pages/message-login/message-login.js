import { sendCode, loginByCode } from '../../network/logs.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
import { getIndex } from '../../network/index.js';
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
            setStorage('user_info', res.data.data);
            that.getStoreInfo();
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
    wx.switchTab({
      url: '/main/pages/mall/mall'
    })
  },
  wxLogin(){
    wx.redirectTo({
      url: '/main/pages/logs/logs',
    })
  },
  getStoreInfo() {
    let _self = this;
    wx.getLocation({
      type: 'wgs84',
      complete(res) {
        getIndex({
          user_id: getStorage('user_id'),
          lng: res.longitude,
          lat: res.latitude
        }).then((res) => {
          let o = {};
          o.store_id = res.data.data.store_id;
          o.store_name = res.data.data.store_name;
          o.lat = res.data.data.store_lat;
          o.lng = res.data.data.store_lng;
          o.store_address = res.data.data.store_address;
          setStorage('store', o);
          _self.closeLoginPage();
        });
      }
    })
  },
  onChange(event) {
    this.setData({
      isRead: event.detail
    });
  },
})