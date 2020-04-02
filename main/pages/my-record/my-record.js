import background from '../../assets/img/bg/bg.js';
import { getCardLog } from '../../network/my-record.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType:'消费记录',
    bg: background.arcBg,
    headData:['时间','操作','金额（元）'],
    account:'',
    list:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCardLog(this.data.page,0);
  },
  getCardLog(page,addPage){
    page += addPage;
    getCardLog({
      user_id: getStorage('user_id'),
      page:page
    }).then((res)=>{
      this.setData({
        list: this.data.list.concat(res.data.data.list),
        account: res.data.data.account,
        page: res.data.data.list.length>0?page:page-addPage
      });
    });
  },
  onReachBottom() {
    this.getCardLog(this.data.page, 1);
  }
})