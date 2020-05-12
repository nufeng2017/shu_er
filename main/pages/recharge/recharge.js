import { getStorage, setStorage } from '../../../cache/cache.js';
import { rechargeCard, getAccount, getStorePeople } from '../../network/recharge.js';
import pay from '../../../utils/pay.js';
import resetUserAccount from '../../../utils/getAccount.js';
Page({
  data: {
    active:0,
    rechargeItem: [],
    money:0,
    user_info:{},
    person:[],
    show:false,
    personVal:'',
    personId:''
  },
  onLoad(){
    this.setData({
      rechargeItem:getStorage('config').bonus
    });
    this.getInfo();
  },
  onClose() {
    this.setData({ show: !this.data.show });
  },
  selectPerson(e){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    this.setData({
      show:false,
      personVal:name,
      personId:id
    });
  },
  onGetUserInfo(e) {
    console.log(e.detail);
  },
  getInfo(){
    this.setData({
      user_info: getStorage('user_info')
    });
    getStorePeople({
      store_id: getStorage('store').store_id
    }).then((res)=>{
      this.setData({
         person:res.data.data
      });
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
    let _self = this;
    rechargeCard({
      user_id: getStorage('user_id'),
      money: this.data.money,
      i_to_user: this.data.personId
    }).then((res)=>{
      wx.requestPayment({
        timeStamp: res.data.data.nowTime.toString(),
        nonceStr: res.data.data.nonce_str,
        package: res.data.data.package,
        signType:'MD5',
        paySign: res.data.data.paysign,
        success(res) {
          wx.showToast({
            title: '充值成功',
            icon: 'none'
          })
          resetUserAccount().then((res)=>{
            _self.setData({
              user_info: getStorage('user_info')
            })
            wx.navigateBack({});
          });
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