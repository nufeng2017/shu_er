const app = getApp();
Component({
  properties: {
    btn1:String,
    btn2: Boolean,
    btn3: Boolean
  },
  data: {
    isIPX: false
  },
  lifetimes: {
    attached() {
      this.isIPX();
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    isIPX() {
      this.setData({
        isIPX: app.globalData.isIphoneX
      });
    },
    checkCar(){
      wx.switchTab({
        url: '/main/pages/car/car',
      })
    }
  }
})