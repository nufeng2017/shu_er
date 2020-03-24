import { getAddressList } from '../../network/manage-address.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getAddressList({
      user_id: getStorage('user_id'),
    }).then((res) => {
      this.setData({
        list: res.data.data,
      });
    });
  },

})