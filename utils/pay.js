import { pay } from '../network/pay.js';
export default function payout(oids,fn) {
  pay({
    user_id: wx.getStorageSync('user_id'),
    oids: oids
  }).then((res) => {
    wx.requestPayment({
      timeStamp: res.data.data.nowTime.toString(),
      nonceStr: res.data.data.nonce_str,
      package: res.data.data.package,
      signType: 'MD5',
      paySign: res.data.data.paysign,
      success(res) {
        fn(res)
      },
      fail(res) {
        wx.showToast({
          title: '支付未完成',
          icon:'none'
        })
      }
    })
  });
}