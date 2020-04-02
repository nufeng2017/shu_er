import background from '../../assets/img/bg/bg.js';
import { getConsumeLog } from '../../network/shop-record.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: background.arcBg,
    page:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(this.data.page,0);
  },
  getList(page,addPage){
    page += addPage;
    getConsumeLog({
      user_id: wx.getStorageSync('user_id'),
      page: page
    }).then((res)=>{
      this.setData({
        list: this.data.list.concat(res.data.data.list),
        page: res.data.data.length > 0 ? page : page - addPage
      });
    });
  },
  onReachBottom(){
    this.getList(this.data.page, 1);
  }
})