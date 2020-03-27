import { getOrderList, cancelOrder } from '../../network/my-order.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
let oid;
let index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive:0,
    tabs:[],
    list1: {//全部订单列表 0
      data:[],
      page:1
    },
    list2: {//待付款 1
      data: [],
      page: 1
    },
    list3: {//待服务 2
      data: [],
      page: 1
    },
    list4: {//待收货 5
      data: [],
      page: 1
    },
    list5: {//待评价 6
      data: [],
      page: 1
    },
    showPopup:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTabs(getStorage('config').order_status);
  },
  onChange(e) {
    let index = e.detail.index;
    this.setData({
      tabActive:index
    });
    if (this.data['list'+ (index + 1)].data.length == 0) {
      this.getList(1,index);
    }
  },
  setTabs(data){
    data = data.filter((item)=>{
      if (item.tag_id == 0 || item.tag_id == 1 || item.tag_id == 2 || item.tag_id == 5 || item.tag_id == 6){
        return item;
      }
    });
    this.setData({
      tabs:data
    });
    this.getList(1,0);//获得订单列表
  },
  getList(page,index){
    let status;
    switch (index) {
      case 0:
        status = 0;
        break;
      case 1:
        status = 1;
        break;
      case 2:
        status = 2;
        break;
      case 3:
        status = 5;
        break;
      case 4:
        status = 6;
        break;
    }
    this.getItemList(page, 'list' + (index + 1), status);
  },
  getItemList(page, pro, status){
    getOrderList({
      user_id: getStorage('user_id'),
      page: page,
      status: status
    }).then((res) => {
      this.setData({
        [pro + '.data']: this.data[pro].data.concat(res.data.data),
        [pro + '.page']: res.data.data.length > 0 ? page : (page - 1 == 0) ? 1 : page - 1
      });
    });
  },
  checkDetails(e){
    let oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '/main/pages/order-details/order-details?oid=' + oid
    })
  },
  cancelOrder(e){//取消订单
    oid = e.currentTarget.dataset.oid;
    index = e.currentTarget.dataset.index;
    this.setData({
      showPopup:true
    });
  },
  cancel(){//弹窗取消
    this.setData({
      showPopup: false
    });
  },
  confirm(){//弹窗确定
    cancelOrder({
      user_id: getStorage('user_id'),
      oid:oid
    });
    let list2 = this.data.list2.data;
    list2.splice(this.findListData(list2, oid),1);
    this.setData({
      showPopup: false,
      ['list1' + '.data[' + this.findListData(this.data.list1.data, oid) + '].status']:8,
      'list2.data': list2,
    });
  },
  findListData(data,oid){//找到符合条件的数据
    let i;
    data.map((item,index)=>{
      if (item.oid == oid){
        i = index;
      }
    });
    return i;
  },
  reachBottom(){//滑动到底部
    let active = this.data.tabActive;
    let page = this.data['list' + (active + 1)].page + 1;
    this.getList(page, active);//获得订单列表
  }
})