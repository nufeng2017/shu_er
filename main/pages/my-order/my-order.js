import { getOrderList, cancelOrder } from '../../network/my-order.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
let oid;
let index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive:0,
    tabs:['全部','待付款','待收货','待评价','已完成'],
    list:[],//订单列表
    showPopup:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(1);//获得订单列表
  },
  getList(page){
    getOrderList({
      user_id: getStorage('user_id'),
      page: page,
    }).then((res)=>{
      this.setData({
        list:res.data.data
      });
    });
  },
  checkDetails(){
    wx.navigateTo({
      url: '/main/pages/order-details/order-details'
    })
  },
  cancelOrder(e){//取消订单
    oid = e.currentTarget.dataset.oid;
    index = e.currentTarget.dataset.index;
    this.setData({
      showPopup:true
    });
  },
  cancel(){//弹窗取消
    this.setData({
      showPopup: false
    });
  },
  confirm(){//弹窗确定
    cancelOrder({
      user_id: getStorage('user_id'),
      oid:oid
    });
    this.setData({
      showPopup: false
    });
  }
})