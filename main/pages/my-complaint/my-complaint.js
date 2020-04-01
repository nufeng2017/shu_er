import { getComplaintList } from '../../network/my-complaint.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getList();
  },
  getList(){
    getComplaintList({
      user_id:wx.getStorageSync('user_id')
    }).then((res)=>{
      this.setData({
        list:res.data.data
      });
    });
  },
  complaint(){
    wx.navigateTo({
      url: '/main/pages/complaint/complaint',
    })
  }
})