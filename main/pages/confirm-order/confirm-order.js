import { confirmOrder, getConfirmOrder, changeAddress } from '../../network/confirm-order.js';
import { getAddressList } from '../../network/manage-address.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
import pay from '../../../utils/pay.js';
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
    showPopup:false,
    showAddress:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let list = JSON.parse(options.list);
    this.filterData(list);
  },
  getAddressList(){
    getAddressList({
      user_id: getStorage('user_id'),
    }).then((res) => {
      let data = this.getDefaultAddress(res.data.data);
      this.setData({
        addressList: [data],
        showPopup: false
      });
      this.changeAddress(res.data.data);
    });
  },
  changeAddress(data){
    changeAddress({
      user_id:getStorage('user_id'),
      address_id: this.data.addressList[0].address_id,
      order_id:this.getOid(),
    }).catch((err) => {
      this.setData({
        showAddress:false
      })
    })
  },
  getDefaultAddress(data){
    let o = {};
    data.map((item,index) => {
      if (item.is_default == 1){
        o = item;
      }
    });
    return o;
  },
  getOid(){
    let list = this.data.submitList;
    let oid = '';
    list.map((item)=>{
      if (item.type == 2){
        oid = item.oid;
      }
    });
    return oid;
  },
  filterData(list){
    list = list.filter((item)=>{
      return item.selected === true;
    });
    confirmOrder({
      user_id: getStorage('user_id'),
      list: JSON.stringify(list)
    }).then((res) =>{
      this.lastPageFn();
      getConfirmOrder({
        user_id: getStorage('user_id'),
        oid: res.data.data.ids
      }).then((res)=>{
        this.setData({
          submitList:res.data.data
        });
        this.getAddressList();
        this.getInfo(res.data.data);
      });
    }).catch((err) => {//订单下架
      this.lastPageFn();
      setTimeout(()=>{
        wx.navigateBack();
      },2000);
    });
  },
  lastPageFn(){
    let pages = getCurrentPages();
    if (pages[pages.length - 2].getList){
      pages[pages.length - 2].getList();
      pages[pages.length - 2].setData({
        product: false,//全部勾选商品
        service: false,//是否全部勾选服务
        checkAll: false,//是否全选
      });
    }
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
    this.setData({
      showPopup: false
    });
  },
  submit(){
    if (this.data.showAddress){
      this.setData({
        showPopup: this.data.addressList.length > 0 ? false : true
      });
    }
    let oids = [];
    this.data.submitList.map((item)=>{
      oids.push(item.oid);
    });
    oids = oids.join(',');
    pay(oids, (res) => {
      wx.redirectTo({
        url: '/main/pages/my-order/my-order'
      })
    });
  },
})