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
    })
  },
  resetData(data){
    let arr1 = [];
    let submitList = [];
    for (let i in data){
      if ( i === 'product'){
        arr1.push({
          typeTxt: '实物类商品',
          selected:false,
          type:2
        })
      }
      if ( i === 'service'){
        arr1.push({
          typeTxt: '服务类商品',
          selected:false,
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
  },
  onChange(val){ //底部栏点击全选
    console.log(val)
    this.setData({
      checkAll: val.detail
    });
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
    this.setData({
      submitList: submitList
    });
  },
  allTypeSel(e){//查看类型是否全选
    let type = e.currentTarget.dataset.item.type;
    let submitList = this.data.submitList;
    submitList = submitList.map((item) => {
      if (item.type == type) {
        
      }
      return item;
    })
  },
  checkSelectedAll(){//查看是否全选
    let submitList = this.data.submitList ;

  }
})