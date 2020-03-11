// main/pages/car/car.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkAll:false,//是否全选
    price:12.3,//价格
    submitCount:2,//提交数量
    hasFreight:'（不包含运费）',
    iconUrl:'/main/assets/img/delete.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(val){ //底部栏点击全选
    console.log(val)
    this.setData({
      checkAll: val.detail
    });
  },
  barSubmit(){
    console.log('结算')
  }
})