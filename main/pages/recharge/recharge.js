import { getStorage, setStorage } from '../../../cache/cache.js';
import { rechargeCard } from '../../network/recharge.js';
import pay from '../../../utils/pay.js';
Page({
  data: {
    active:0,
    rechargeItem: [],
    money:0
  },
  onLoad(){
    this.setData({
      rechargeItem:getStorage('config').bonus
    });
  },
  selectPrice(e){
    let index = e.currentTarget.dataset.index == this.data.active ? 0 : parseInt(e.currentTarget.dataset.index);
    this.setData({
      active:index,
    });
    this.setData({
      money: this.data.active == 0 ? 0 : this.data.rechargeItem[this.data.active - 1].money
    });
  },
  focus(){
    this.setData({
      active: 0,
    });
  },
  inputVal(e){
    this.setData({
      money: e.detail.value,
    });
  },
  submit(){
    rechargeCard({
      user_id: getStorage('user_id'),
      money: this.data.money
    }).then((res)=>{
      wx.requestPayment({
        timeStamp: res.data.data.nowTime.toString(),
        nonceStr: res.data.data.nonce_str,
        package: 'prepay_id =' + res.data.data.prepay_id,
        signType: 'MD5',
        paySign: res.data.data.paysign,
        success(res) {
          wx.showToast({
            title: '充值成功',
            icon: 'none'
          })
        },
        fail(res) {
          wx.showToast({
            title: '充值未完成',
            icon: 'none'
          })
        }
      })
    }).catch((err)=>{
      wx.showToast({
        title: err.data.msg,
        icon:'none'
      })
    });
  }
});