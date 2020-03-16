const app = getApp();
Component({
  properties: {
    btn1:Boolean,
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
      console.log(app.globalData.isIphoneX)
      if (this.data.noTabbar) {
        this.setData({
          isIPX: app.globalData.isIphoneX
        });
      }
    }
  }
})