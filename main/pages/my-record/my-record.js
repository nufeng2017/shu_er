import background from '../../assets/img/bg/bg.js';
import { getCardLog } from '../../network/my-record.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType:'消费记录',
    bg: background.arcBg,
    headData:['时间','操作','金额（元）'],
    pageInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCardLog();
  },
  getCardLog(){
    getCardLog({
      user_id: getStorage('user_id')
    }).then((res)=>{
      this.setData({
        pageInfo:res.data.data
      });
    });
  }
})