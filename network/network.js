let env = getApp().globalData.env;
let baseUrl;
if (env === 'develop'){
  baseUrl = 'https://www.sekjce.com/xcxApi/';
} else {
  baseUrl = 'https://www.sekjce.com/xcxApi/';
}

/**
 * 配置属性:
 * url:接口地址，
 * data:数据,类型见小程序文档,
 * header:请求头,
 * timeout:网络延时,
 * hideLoading:隐藏加载框,
 * notNeedHideLoding:不需要隐藏加载框的函数
 * loadTitle:加载框文字
 * method:请求方式
 * hideErrToast:隐藏错误提示
 */
function network (config){
  if (!config.hideLoading){
    wx.showLoading({
      title: config.loadTitle ? config.loadTitle : '加载中',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + config.url,
      data: config.data ? config.data : '',
      header: config.header ? config.header : { 'Content-Type':'application/x-www-form-urlencoded '},
      timeout: config.timeout ?timeout:7000,
      method: config.method ? config.method : 'GET',
      success:(res) => {
        console.log(res)
        if (res.data.result === 1) {
          resolve(res);
        } else {
          reject(res);
          if (!config.hideErrToast){
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            });
          }
        }
      },
      fail:(err) => {
        wx.showToast({
          title: '无网络连接',
          icon: 'none'
        });
      },
      complete:(res) => {
        if (!config.notNeedHideLoding){
          wx.hideLoading();
        }
      }
    });
  });
}
export default network;