import { getIndex, getConfig } from '../../network/index.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
import utils from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headLink:[//头部导航数据
      {
        imgUrl:'/main/assets/img/member-code-icon.png',
        title:'会员码',
        link: '/main/pages/vip-code/vip-code'
      },{
        imgUrl: '/main/pages/index/img/recharge-icon.png',
        title: '会员充值',
        link:'/main/pages/recharge/recharge'
      },{
        imgUrl: '/main/pages/index/img/shop-icon.png',
        title: '招商加盟',
        link:'/main/pages/webview/webview'
      }
    ],
    proLink:[//项目数据
      {
        imgUrl:'/main/pages/index/img/pro-1.png',
        title:'精致洗鼻'
      }, {
        imgUrl: '/main/pages/index/img/pro-2.png',
        title: '特色洗眼'
      },{
        imgUrl: '/main/pages/index/img/pro-3.png',
        title: '专业采耳'
      }, {
        imgUrl: '/main/pages/index/img/pro-4.png',
        title: '头部SPA'
      }
    ],
    swiper:{//轮播属性配置
      indicatorDots:true,
      autoplay:false,
      interval:3000,
      duration:500,
    },
    indexData:{},//首页数据
    locationInfo:{},//位置信息
    watchStoreId:'',//监视门店ID变化
    isFirstEnter:true,//是否第一次打开这个页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getLocationInfo();
  },
  onShow(){
    if (this.data.isFirstEnter){
      return;
    } else {
      this.setData({
        isFirstEnter:true
      });
    }
    if (this.data.watchStoreId != this.data.indexData.store_id) {
      this.getIndexData({
        user_id: getStorage('user_id'),
        store_id: this.data.indexData.store_id
      });
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.getIndexData({
      user_id: getStorage('user_id'),
      store_id: this.data.indexData.store_id
    });
  },
  getLocationInfo(){//获取位置
    let _self = this;
    utils.getLocation().then((res)=>{
      _self.setData({
        locationInfo: res
      });
      _self.getIndexData({
        user_id: getStorage('user_id'),
        lng: res.longitude,
        lat: res.latitude
      });
      _self.getConfig({
        lng: res.longitude,
        lat: res.latitude
      });
    });
  },
  getIndexData(data){//获取首页商品列表
    let _self = this;
    getIndex(data).then((res) => {
      wx.stopPullDownRefresh();
      _self.setData({
        indexData: res.data.data,
        watchStoreId: res.data.data.store_id
      });
    })
  },
  getConfig(data){
    getConfig(data).then((res)=>{
      setStorage('config',res.data.data);
    });
  },
  checkMore(){
    wx.switchTab({
      url: '/main/pages/mall/mall',
    })
  }
})