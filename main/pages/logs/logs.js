import { loginByWeixinPhone } from '../../network/logs.js'
import { getStorage, setStorage } from '../../../cache/cache.js';
import { getIndex } from '../../network/index.js';
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
        that.getStoreInfo();
      })
    } 
  },
  closeLoginPage(){
    wx.switchTab({
      url: '/main/pages/mall/mall'
    })
  },
  getStoreInfo(){
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
  messageLogin(e){
    wx.redirectTo({
      url: '/main/pages/message-login/message-login',
    })
  },
  
})