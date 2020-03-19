import { getIndex } from '../../network/index.js';
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
        title: '会员充值'
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
      item:[{
        img: '/main/pages/index/img/banner.png',
      },{
        img: '/main/pages/index/img/banner.png',
      }],
    },
    locationInfo:{},//位置信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getLocationInfo();
  },
  getLocationInfo(){
    utils.getLocation().then((res)=>{
      console.log(res)
    });
  }
})