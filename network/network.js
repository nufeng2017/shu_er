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
 * hideloading:隐藏加载框,
 * loadTitle:加载框文字
 * method:请求方式
 */
function network (config){
  if (!config.hideloading){
    wx.showLoading({
      title: config.loadTitle ? config.loadTitle : '加载中',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + config.url,
      data: config.data ? config.data : '',
      header: config.header ? config.header : {},
      timeout: config.timeout ?timeout:7000,
      method: config.method ? config.method : 'GET',
      success:(res) => {
        resolve(res);
      },
      fail:(res) => {
        reject(res);
      },
      complete:() => {
        wx.hideLoading();
      }
    });
  });
}
export default network;