import { getCommentList } from '../../network/all-comment.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    options:{},
    page:1,
    listTotal:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    });
    this.getCommentList(this.data.page,0);
  },
  getCommentList(page,addPage){
    page += addPage
    getCommentList({
      type: this.data.options.type,
      pid: this.data.options.pid,
      page:page
    }).then((res)=>{
      this.setData({
        listTotal: res.data.data.comment_total,
        list: res.data.data.comment_list,
        page: res.data.data.comment_list.length>0?page:page-addPage
      });
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getCommentList(this.data.page, 1);
  },

})