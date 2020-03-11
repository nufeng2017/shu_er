//app.js
App({
  onLaunch: function () {
    this.isIpx();
  },
  isIpx(){//判断是否是IPONEX
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
  globalData: {
    isIphoneX: false
  }
})