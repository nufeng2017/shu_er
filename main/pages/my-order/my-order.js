import { getOrderList, cancelOrder, confirmReceive } from '../../network/my-order.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
import pay from '../../../utils/pay.js';
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
    popupTypeConfig:{
      '取消订单': '是否确认取消该订单？',
      '确认收货': '是否确认收货？'
    },
    popupType:'',
    commentPopup:{
      show: false,
      info:{}
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(){
    this.setTabs(getStorage('config').order_status);
  },
  onChange(e) {
    let index = e.detail.index;
    this.setData({
      tabActive:index
    });
    this.getList(1, index,1);
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
    this.getList(1, this.data.tabActive,1);//获得订单列表
  },
  getList(page,index,isFirst){
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
    this.getItemList(page, 'list' + (index + 1), isFirst,status);
  },
  getItemList(page, pro, isFirst,status){
    getOrderList({
      user_id: getStorage('user_id'),
      page: page,
      status: status
    }).then((res) => {
      if (isFirst == 1){//是第一次请求数据
        this.setData({
          [pro + '.data']: [],
        });
      }
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
    let popupType = e.currentTarget.dataset.popup;
    this.setData({
      showPopup:true,
      popupType: popupType
    });
  },
  cancel(){//弹窗取消
    this.setData({
      showPopup: false
    });
  },
  confirm(){//弹窗确定
    if (this.data.popupType == '取消订单'){
      cancelOrder({
        user_id: getStorage('user_id'),
        oid:oid
      }).then(()=>{
        this.changePageShow(8);
      });
      
    } else if (this.data.popupType == '确认收货'){
    console.log(oid)
      confirmReceive({
        user_id: getStorage('user_id'),
        oid: oid
      }).then(()=>{
        this.setData({
          tabActive:4,
          showPopup: false
        });
      });
    }
  },
  changePageShow(status){
    let list = this.data['list' + (this.data.tabActive + 1)].data;
    let i = this.findListData(list, oid);
    console.log(i)
    if (this.data.tabActive == 0){
      this.setData({
        showPopup: false,
        ['list' + (this.data.tabActive + 1) + '.data[' + i + '].status']: status,
      });
    } else {
      list.splice(i,1);
      this.setData({
        showPopup: false,
        ['list' + (this.data.tabActive + 1) + '.data']: list,
      });
    }
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
  },
  payout(e){
    let item = e.currentTarget.dataset.item;
    pay(item.oid,(res)=>{
      this.setData({
        tabActive: Number(item.type) + 1
      });
    });
  },
  limitComment(e){
    let item = e.currentTarget.dataset.item;
    oid = e.currentTarget.dataset.oid;
    index = e.currentTarget.dataset.index;
    this.setData({
      commentPopup:{
        show:true,
        info:item
      }
    });
  },
  comment(){
    wx.showToast({
      title: '感谢您的评价！',
      icon:'none'
    });
    this.setData({
      'commentPopup.show':false
    });
    this.changePageShow(7);
  }
})