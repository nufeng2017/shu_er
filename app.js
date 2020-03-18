App({
  onLaunch: function () {
    this.isIpx();//判断是否是IPONEX
    this.checkSession();//检查登录是否过期
  },
  isIpx(){
    let _self = this;
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          _self.globalData.isIphoneX = true
        }
      }
    })
  },
  checkSession(){
    wx.checkSession({
      success() {
        console.log('登录有效期内')
      },
      fail() {
        //重新登录清除所有缓存
        wx.clearStorageSync();
      }
    })
  },
  globalData: {
    isIphoneX: false,
    env: wx.getAccountInfoSync().miniProgram.envVersion,//判断版本
  }
})