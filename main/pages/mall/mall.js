import { getProductList } from '../../network/mail.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{title:'热销服务',empty:false},{title:'采耳工具',empty:false},{title:'采耳耗材',empty:false}],
    tabActive:0,
    productList:{},//产品列表
  },
  onLoad(){
    this.resetData();//根据tabs选项动态扩展数据
    this.getListData(0);
  },
  reachBottom	(){
    console.log(1)
    this.getListData(1);
  },
  resetData(){
    for ( let i = 0 ; i < this.data.tabs.length ; i ++){
      this.setData({
        ['page' + i]:1,
        ['productList.' + i]:[]
      });
    }
  },
  onChange(e){
    this.setData({
      tabActive:e.detail.index
    });
    if (this.data.productList[this.data.tabActive].length == 0){
      this.getListData(0);
    }
  },
  getListData(pageCount){
    let _self = this;
    getProductList({
      type: this.data.tabActive + 1,
      page: this.data['page' + this.data.tabActive] + pageCount
    }).then((res) => {
      _self.setData({
        ['productList.' + _self.data.tabActive]: _self.data.productList[_self.data.tabActive].concat(res.data.data),
        ['page.' + _self.data.tabActive]: _self.data['page' + _self.data.tabActive] + pageCount
      });
      _self.isShowEmptyDataTips();//是否显示空数据提示
    });
  },
  isShowEmptyDataTips(){
    let _self = this;
    let tabs = _self.data.tabs;
    tabs[_self.data.tabActive].empty = _self.data.productList[_self.data.tabActive].length > 0 ? false : true;
    _self.setData({
      tabs: tabs
    });
  }
})