
Component({
  properties: {
    showSelect:Boolean,
    showStepper:Boolean,
    imgUrl:String,
    defaultImg:String,
    url:String,
    showArrow:Boolean,
    item:Object
  },
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  methods: {
    navigateTo(){
      console.log(this.data.url)
      wx.navigateTo({
        url:this.data.url
      });
    },
    change(){
      let item = this.data.item;
      item.selected = !this.data.item.selected;
      this.triggerEvent('select', item);
    },
    onChange(e){
      let item = this.data.item;
      item.num = e.detail;
      this.triggerEvent('stepper', item);
    }
  }
})