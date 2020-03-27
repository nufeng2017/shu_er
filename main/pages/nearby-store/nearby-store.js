import { getStoreList} from '../../network/nearby-store.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:{},
    storeList:[],
    defaultStore:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options,
      defaultStore: options.store_id
    })
    this.getStoreList(options);
  },
  onUnload(){
    let pageInfo = getCurrentPages();
    let indexPage = pageInfo[0];
    indexPage.setData({
      'indexData.store_id': this.data.defaultStore,
      isFirstEnter:false
    });
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.getStoreList(this.data.options);
  },
  getStoreList(options){
    let _slef = this;
    getStoreList({
      lat: options.lat,
      lng: options.lng,
      city_id: getStorage('config').citys[0].tag_id
    }).then((res) => {
      wx.stopPullDownRefresh();
      _slef.setData({
        storeList: res.data.data
      });
    });
  },
  selStore(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      defaultStore:id
    });
  }
})