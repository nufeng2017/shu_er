const app = getApp();
Component({
  properties: {
    checkAll: Boolean,//是否全选
    price:String,//价格
    btnText:String,//按钮文字
    boardText:String,//面板文字
    hasFreight:String,//是否有运费
    showCheckbox:{//是否显示全选按钮
      type:Boolean,
      value:true
    },
    noTabbar:{//底部没有其他tabbar，默认没有
      type:Boolean,
      value:true
    },
    borderColor: String,//是否显示上边框，值为颜色值
    shadow:String,//是否显示上部阴影，值为颜色值
  },
  data:{
    isIPX:false
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
      if (this.data.noTabbar){
        this.setData({
          isIPX: app.globalData.isIphoneX
        });
      }
    },
    change(e){
      this.triggerEvent('checkall',e.detail);
    },
    submit(){
      this.triggerEvent('submit');
    },
  }
})