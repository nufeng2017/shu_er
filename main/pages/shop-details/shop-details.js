import { getProductInfo } from '../../network/shop-details.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
import { addCart } from '../../network/shop-item.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {//轮播属性配置
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 500
    },
    pruductInfo:{},//商品具体信息
    carLen:0,//购物车数量
    options:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductInfo(options);
  },
  getProductInfo(options){
    getProductInfo({
      pid: options.pid,
      type:options.type
    }).then((res)=>{
      this.setData({
        pruductInfo:res.data.data,
        carLen: getStorage('car_list').length.toString(),
        options: options
      });
    });
  },
  checkImg(){ 
    wx.navigateTo({
      url: '/main/pages/check-img/check-img',
    })
  },
  addCar(e) {
    if (!wx.getStorageSync('user_id')) {
      wx.navigateTo({
        url: '/main/pages/logs/logs',
      });
      return;
    }
    let item = this.data.pruductInfo;
    addCart({
      user_id: wx.getStorageSync('user_id'),
      type: this.data.options.type,
      pid: this.data.options.pid,
      num: 1
    }).then((res) => {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      let car_list = getStorage('car_list');
      if (!Array.isArray(car_list)) {
        car_list = [];
      }
      item.num = 1;
      for (let i = 0; i < car_list.length; i++) {
        if (car_list[i].pid == item.pid) {
          car_list[i].num = parseInt(car_list[i].num) + 1;
          setStorage('car_list', car_list);
          return;
        }
      }
      car_list.push(item);
      setStorage('car_list', car_list);
      this.setData({
        carLen: getStorage('car_list').length.toString()
      })
    });
  }
})