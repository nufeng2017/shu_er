// main/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cells:[{
      url:'/main/pages/my-order/my-order',
      title:'我的订单',
      icon:'/main/pages/my/img/cell-1.png'
    },{
      url:'',
      title:'地址管理',
        icon:'/main/pages/my/img/cell-2.png'
    },{
      url:'',
      title:'我的评论',
        icon:'/main/pages/my/img/cell-3.png'
    },{
      url:'',
      title:'我的投诉',
        icon:'/main/pages/my/img/cell-4.png'
    },{
      url:'',
      title:'消费记录',
        icon:'/main/pages/my/img/cell-5.png'
    },{
      url:'',
      title:'客服帮助',
      icon:'/main/pages/my/img/cell-6.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})