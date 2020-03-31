import { getStorage, setStorage  } from '../../../cache/cache.js';
import utils from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',//登录所需ID
    popopShow:false,//弹窗显示
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
      url: '/main/pages/shop-record/shop-record',
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
    this.login = utils.login;//获取检查登录ID再选择是否登录的函数
  },
  onShow(){
    this.checkLogin();//检查登录情况
  },
  logout(){//退出登录弹窗
    this.setData({
      popopShow:true
    })
  },
  logoutCancel(){//退出登录弹窗取消
    this.setData({
      popopShow: false
    })
  },
  logoutConfirm() {//退出登录弹窗确定
    this.setData({
      popopShow: false,
      user_id:''
    })
    wx.removeStorageSync('user_id');
    wx.removeStorageSync('car_list');
  },
  checkLogin(){
    if (getStorage('user_id')){
      this.setData({
        user_id: getStorage('user_id')
      });
    }
  },
  checkRerord(){
    wx.navigateTo({
      url: '/main/pages/my-record/my-record',
    })
  }
})