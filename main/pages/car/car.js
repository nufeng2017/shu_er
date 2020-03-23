import { getCartList } from '../../network/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkAll:false,//是否全选
    price:12.3,//价格
    submitCount:'结算(2)',//提交数量
    hasFreight:'（不包含运费）',
    listType:[],//页面渲染列表
    showSubmitBar:false,//显示提交栏
    submitList:[],//将要提交的数据
    product:false,//全部勾选商品
    service:false,//是否全部勾选服务
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onShow(){
    this.getList();//获取购物车列表数据
  },
  getList(){
    getCartList({
      user_id:wx.getStorageSync('user_id')
    }).then((res) => {
      this.resetData(res.data.data.list);
    }).catch((err)=>{});
  },
  resetData(data){
    let arr1 = [];
    let submitList = [];
    for (let i in data){
      if ( i === 'product'){
        arr1.push({
          typeTxt: '实物类商品',
          type:2
        })
      }
      if ( i === 'service'){
        arr1.push({
          typeTxt: '服务类商品',
          type: 1
        })
        Object.values(data[i]).map((item,idnex)=>{
          submitList = submitList.concat(item)
        });
        continue;
      }
      submitList = submitList.concat(data[i]);
    }
    this.setData({
      showSubmitBar: submitList.length > 0 ? true :false,
      submitList: submitList,
      listType:arr1
    });
    this.checkSelected(submitList);
  },
  onChange(val){ //底部栏点击全选
    let submitList = this.data.submitList;
    submitList = submitList.map((item) => {
      item.selected = !this.data.checkAll
      return item;
    });
    this.checkSelected(submitList);
  },
  barSubmit(){
    wx.navigateTo({
      url: '/main/pages/confirm-order/confirm-order'
    })
  },
  select(e){//选取单个商品
    this.checkList(this.data.submitList,e.detail);
  },
  checkList(submitList,data){//筛查选中数据
    submitList = submitList.map((item) => {
      if (item.pid == data.pid) {
        item = data;
      }
      return item;
    })
    this.checkSelected(submitList);
  },
  allTypeSel(e){//全选此类型
    let type = e.currentTarget.dataset.item.type;
    let submitList = this.data.submitList;
    let pro = e.currentTarget.dataset.pro;
    submitList = submitList.map((item)=>{
      if (item.type == type){
        item.selected = !this.data[pro]
      }
      return item;
    });
    this.checkSelected(submitList);
  },
  checkSelected(submitList){//查看是否全选此类型
    let service = true;
    let product = true;
    let checkAll = true;
    for (let i = 0; i < submitList.length ; i ++){
      if (!submitList[i].selected){
        if (submitList[i].type == 1){//服务类
          service = false;
        } else {
          product = false;
        }
        checkAll = false;
      } 
    }
    this.setData({
      service: service,
      product: product,
      checkAll: checkAll,
      submitList: submitList
    });
  }
})