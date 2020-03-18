import { getStorage, setStorage  } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',//登录所需ID
    cells:[{
      url:'/main/pages/my-order/my-order',
      title:'我的订单',
      icon:'/main/pages/my/img/cell-1.png'
    },{
      url:'/main/pages/manage-address/manage-address',
      title:'地址管理',
      icon:'/main/pages/my/img/cell-2.png'
    },{
      url:'/main/pages/my-comment/my-comment',
      title:'我的评论',
      icon:'/main/pages/my/img/cell-3.png'
    },{
      url: '/main/pages/my-complaint/my-complaint',
      title:'我的投诉',
      icon:'/main/pages/my/img/cell-4.png'
    },{
      url: '/main/pages/my-record/my-record',
      title:'消费记录',
      icon:'/main/pages/my/img/cell-5.png'
    },{
      url: '',
      title:'客服帮助',
      icon:'/main/pages/my/img/cell-6.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin();//检查登录情况
  },
  checkLogin(){
    if (getStorage('user_id')){
      this.setData({
        user_id: getStorage('user_id')
      });
    }
  }
})