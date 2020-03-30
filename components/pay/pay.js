import {pay} from './network/pay.js';
Component({
  data: {
    args: {
      fee: 0.1,             // 支付金额，单位为分
      paymentArgs: 'A', // 将传递到功能页函数的自定义参数
      currencyType: 'CNY' // 货币符号，页面显示货币简写 US$ 
    }
  },
  methods: {
    payout(){
      pay({
        user_id:wx.getStorageSync('user_id'),
        oids:'201'
      }).then((res)=>{
        wx.requestPayment({
          timeStamp: res.data.data.nowTime.toString(),
          nonceStr: res.data.data.nonce_str,
          package: 'prepay_id=' + res.data.data.prepay_id,
          signType: 'HMAC-SHA256',
          paySign: res.data.data.sign,
          success(res) {
            console.log(res)
          },
          fail(res) { 
            console.log(res)
          }
        })
      });
    }
  }
})