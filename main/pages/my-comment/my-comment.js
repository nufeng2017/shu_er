import { getMyCommentList, deleteComment } from '../../network/my-comment.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(this.data.page);
  },
  getList(page,addPage){
    if (addPage){
      page += addPage;
    }
    getMyCommentList({
      user_id:wx.getStorageSync('user_id'),
      page:page
    }).then((res)=>{
      this.setData({
        list:this.data.list.concat(res.data.data.comment_list),
        page: res.data.data.comment_list.length > 0 ? page : page - addPage
      });
    });
  },
  reachBottom(page,addPage){
    this.getList(this.data.page,1);
  },
  deleteItem(){
    deleteComment({
      user_id: wx.getStorageSync('user_id'),
    }).then((res)=>{
      
    });
  }
})