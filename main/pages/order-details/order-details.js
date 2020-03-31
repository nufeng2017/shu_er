import { getOrderInfo } from '../../network/order-details.js';
import { cancelOrder, confirmReceive } from '../../network/my-order.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}//订单详情信息
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
          info: res.data.data[0]
        });
      }
    });
  },
})