
Component({
  properties: {
    showSelect:Boolean,
    showStepper:Boolean,
    imgUrl:String,
    defaultImg:String,
    url:String,
    showArrow:Boolean
  },
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  methods: {
    navigateTo(){
      wx.navigateTo({
        url:this.data.url
      });
    }
  }
})