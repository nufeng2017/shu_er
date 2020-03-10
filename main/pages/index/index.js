// main/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headLink:[//头部导航数据
      {
        imgUrl:'/main/assets/img/index/member-code-icon.png',
        title:'会员码'
      },{
        imgUrl: '/main/assets/img/index/recharge-icon.png',
        title: '会员充值'
      },{
        imgUrl: '/main/assets/img/index/shop-icon.png',
        title: '招商加盟'
      }
    ],
    proLink:[//项目数据
      {
        imgUrl:'/main/assets/img/index/pro-1.png',
        title:'精致洗鼻'
      }, {
        imgUrl: '/main/assets/img/index/pro-2.png',
        title: '特色洗眼'
      },{
        imgUrl: '/main/assets/img/index/pro-3.png',
        title: '专业采耳'
      }, {
        imgUrl: '/main/assets/img/index/pro-4.png',
        title: '头部SPA'
      }
    ],
    swiper:{//轮播属性配置
      indicatorDots:true,
      autoplay:false,
      interval:3000,
      duration:500,
      item:[{
        img: '/main/assets/img/index/banner.png',
      },{
        img: '/main/assets/img/index/banner.png',
      }],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})