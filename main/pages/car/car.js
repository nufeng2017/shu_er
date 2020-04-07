import { getCartList, editCart, delInvaildCart } from '../../network/car.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
let item={};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkAll:false,//是否全选
    hasFreight:'（不包含运费）',
    listType: [{
      typeTxt: '服务类商品',
      type: 1,
      show:false
    }, {
      typeTxt: '实物类商品',
      type: 2,
      show:false
    }],
    submitList:[],//将要提交的数据
    lowerList:[],//下架商品
    product:false,//全部勾选商品
    service:false,//是否全部勾选服务
    totalPrice:0,//总价格
    productNum:0,//选中商品数
    showPopup:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();//获取购物车列表数据
  },
  onShow(){
    if (!getStorage('user_id')) {
      this.setData({
        submitList: [],
      });
      this.showBlock();
      return;
    }
    let car_list = getStorage('car_list');
    if (Array.isArray(car_list)) {
      if (car_list.length != this.data.submitList.length){//增加种类
        this.setData({
          submitList: car_list,
          product:false,
          service:false,
          checkAll:false,
        });
      } else {//增加数量
        let submitList = this.data.submitList;
        submitList = submitList.map((item,index)=>{
          item.num = car_list[index].num;
          return item;
        })
        this.setData({
          submitList: submitList
        });
      }
    } else {//切换门店
      this.getList();//获取购物车列表数据
    }
    this.showBlock();
    this.calculationPrice();
  },
  getList(){
    getCartList({
      user_id:wx.getStorageSync('user_id')
    }).then((res) => {
      this.resetData(res.data.data.list);
    }).catch((err)=>{});
  },
  resetData(data){
    let submitList = [];
    for (let i in data){
      if ( i === 'service'){
        Object.values(data[i]).map((item,idnex)=>{
          submitList = submitList.concat(item)
        });
        continue;
      }
      submitList = submitList.concat(data[i]);
    }
    let arr = this.getOtherData(submitList);
    this.setData({
      submitList: arr[0],
      lowerList:arr[1]
    });
    setStorage('car_list', this.data.submitList);
    this.showBlock();//检查是否显示模块
  },
  getOtherData(submitList){
    let arr = [[], []];
    submitList.map((item,index)=>{
      if (item.status == 0){
        arr[1].push(item);
        return;
      }
      arr[0].push(item);
    });
    return arr;
  },
  showBlock(){
    let showType1 = false;
    let showType2 = false;
    this.data.submitList.map((i)=>{
      if (i.type == 1){
        showType1 = true
      } else if (i.type == 2){
        showType2 = true;
      }
    });
    this.setData({
      ['listType[0].show']: showType1,
      ['listType[1].show']: showType2,
    });
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
    if (this.data.productNum > 0){
      wx.navigateTo({
        url: '/main/pages/confirm-order/confirm-order?list=' + JSON.stringify(this.data.submitList)
      })
    } else {
      wx.showToast({
        title:'请选择商品',
        icon:'none'
      })
    }
  },
  select(e){//选取单个商品
    this.checkList(this.data.submitList,e.detail);
  },
  stepper(e){//加减数量
    this.editCar(e.detail, e.detail.num, () => {
      let submitList = this.data.submitList;
      submitList = submitList.map((item) => {
        if (item.pid == e.detail.pid) {
          item = e.detail;
        }
        return item;
      })
      this.setData({
        submitList: submitList
      });
      setStorage('car_list', submitList);
      this.calculationPrice();
    });
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
    console.log(e)
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
    this.calculationPrice();
  },
  calculationPrice(){
    let submitList = this.data.submitList;
    let price = 0;
    let productNum = 0;
    submitList.map((item) => {
      if (item.selected){
        productNum++
        price += parseFloat(item.price) * parseInt(item.num);
      }
    });
    this.setData({
      totalPrice: price,
      productNum: productNum
    });
  },
  editCar(item,num,fn){
    editCart({
      user_id: wx.getStorageSync('user_id'),
      type:item.type,
      pid:item.pid,
      num:num
    }).then((res)=>{
      fn(res);
    });
  },
  deleteLower(){//清空失效产品
    delInvaildCart({
      user_id: wx.getStorageSync('user_id')
    }).then((res)=>{
      this.setData({
        lowerList:[]
      });
    })
  },
  deleteCar(e) {//删除购物车
    item = e.currentTarget.dataset.item;
    this.setData({
      showPopup: true
    });
  },
  confirm(){
    this.editCar(item, 0, () => {
      let submitList = this.data.submitList;
      submitList = submitList.filter((i, index) => {
        return i.pid != item.pid
      });
      this.setData({
        submitList: submitList
      })
      setStorage('car_list', submitList);
      this.showBlock();
      this.calculationPrice();
      this.setData({
        showPopup: false
      });
    });
  },
  cancel(){
    this.setData({
      showPopup: false
    });
  }
})