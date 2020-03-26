import { getAddressList, addAddress,deleteAddress } from '../../network/manage-address.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    getAddressList({
      user_id: getStorage('user_id'),
    }).then((res) => {
      this.setData({
        list: res.data.data,
      });
    });
  },
  change(e){
    let item = e.currentTarget.dataset.item;
    if (item.is_default == 1){
      return;
    } else {
      this.data.list.map((key,i) => {
        this.setData({
          ['list[' + i + '].is_default']: key.address_id == item.address_id?1:0
        });
      });
      item.is_default = 1;
      item.user_id = getStorage('user_id');
      addAddress(item);
    }
  },
  deleteAddress(e){
    let item = e.currentTarget.dataset.item;
    deleteAddress({
      user_id: getStorage('user_id'),
      address_id: item.id
    }).then((res) => {
      let list = this.data.list.filter((i,index)=>{
        return i.id != item.id;
      });
      this.setData({
        list: list
      });
    });
  },
  edit(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/main/pages/new-address/new-address?item=' + JSON.stringify(item),
    })
  }
})