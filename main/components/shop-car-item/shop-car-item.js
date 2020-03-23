
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
  data:{
    selected:false,
  },
  lifetimes: {
    attached: function () {
      this.setData({
        selected: this.data.item.selected?true:false
      });
    },
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
    },
    change(){
      let item = this.data.item;
      item.selected = !this.data.selected
      this.triggerEvent('select', item);
      this.setData({
        selected: !this.data.selected
      });
    },
    onChange(e){
      let item = this.data.item;
      item.num = e.detail;
      this.triggerEvent('select', item);
    }
  }
})