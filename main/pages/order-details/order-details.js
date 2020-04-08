import { getOrderInfo } from '../../network/order-details.js';
import { cancelOrder, confirmReceive } from '../../network/my-order.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
import pay from '../../../utils/pay.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},//订单详情信息
    showPopup:false,
    popupTypeConfig: {
      '取消订单': '是否确认取消该订单？',
      '确认收货': '是否确认收货？'
    },
    popupType: '',
    commentPopup: {
      show: false,
      info: {}
    },
    store:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(options.oid);
  },
  getInfo(oid){
    getOrderInfo({
      user_id: getStorage('user_id'),
      oid: oid
    }).then((res)=>{
      if (res.data.data.length>0){
        this.setData({
          info: res.data.data[0],
          store: getStorage('store')
        });
      }
    });
  },
  payout(){
    pay(this.data.info.oid, (res) => {
      this.getInfo(this.data.info.oid);
    });
  },
  cancelOrder(e){
    let popupType = e.currentTarget.dataset.popup;
    this.setData({
      showPopup: true,
      popupType: popupType
    });
  },
  cancel() {//弹窗取消
    this.setData({
      showPopup: false
    });
  },
  confirm() {//弹窗确定
    if (this.data.popupType == '取消订单') {
      cancelOrder({
        user_id: getStorage('user_id'),
        oid: this.data.info.oid
      }).then(() => {
        this.getInfo(this.data.info.oid);
      });

    } else if (this.data.popupType == '确认收货') {
      confirmReceive({
        user_id: getStorage('user_id'),
        oid: this.data.info.oid
      }).then(() => {
        this.getInfo(this.data.info.oid);
      });
    }
    this.setData({
      showPopup: false
    });
  },
  limitComment(e) {
    this.setData({
      commentPopup: {
        show: true,
        info: this.data.info
      }
    });
  },
  comment() {
    wx.showToast({
      title: '感谢您的评价！',
      icon: 'none'
    });
    this.setData({
      'commentPopup.show': false
    });
    this.getInfo(this.data.info.oid);
  },
  copyText(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.txt,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })
  },
  checkMap(){
    wx.navigateTo({
      url: '/main/pages/map/map?item=' + JSON.stringify(getStorage('store')),
    })
  }
})