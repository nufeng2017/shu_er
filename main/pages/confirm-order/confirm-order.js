import { confirmOrder, getConfirmOrder } from '../../network/confirm-order.js';
import { getAddressList } from '../../network/manage-address.js';
import { getStorage, setStorage } from '../../../cache/cache.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitList:[],
    productTotalPrice:0,//商品总价
    productNum:0,//商品总数
    delivery_price:0,//运费
    totalPrice:0,//总价
    addressList:[],//地址列表
    showPopup:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list = JSON.parse(options.list);
    this.filterData(list);
  },
  onShow(){
    getAddressList({
      user_id: getStorage('user_id'),
    }).then((res) =>{
      this.setData({
        addressList:res.data.data,
        showPopup: res.data.data.length>0?false:true
      });
    });
  },
  filterData(list){
    list = list.filter((item)=>{
      return item.selected === true;
    });
    confirmOrder({
      user_id: getStorage('user_id'),
      list: JSON.stringify(list)
    }).then((res) =>{
      getConfirmOrder({
        user_id: getStorage('user_id'),
        oid: res.data.data.ids
      }).then((res)=>{
        this.setData({
          submitList:res.data.data
        });
        this.getInfo(res.data.data);
      });
    });
  },
  getInfo(data){
    let productNum = 0;
    let delivery_price = 0;
    let totalPrice = 0;
    let productTotalPrice = 0;
    let arr = [];
    data.map((item) => {
      arr = arr.concat(item.products);
      productTotalPrice += parseFloat(item.product_price);
      productNum += parseInt(item.total_num);
      delivery_price += parseFloat(item.delivery_price);
    });
    totalPrice = productTotalPrice + delivery_price;
    this.setData({
      productTotalPrice: productTotalPrice,
      totalPrice: totalPrice,
      delivery_price: delivery_price,
      productNum: productNum
    });
  },
  confirm(){//弹窗确定
    wx.navigateTo({
      url: '/main/pages/manage-address/manage-address',
    })
  },
  cancel() {//弹窗取消
    wx.navigateBack();
  },
})