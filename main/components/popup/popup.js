
Component({
  properties: {
    title: String,//弹窗标题
    show: Boolean,//是否显示弹窗
    showCancel:{
      type:Boolean,
      value:true
    },
    cancelTxt:{
      type:String,
      value:'取消'
    },
    confirmTxt: {
      type: String,
      value: '确定'
    },
  },
  methods: {
    confirm(){
      this.triggerEvent('confirm');
    },
    cancel() {
      this.triggerEvent('cancel');
    },
    closePopup(){
      this.setData({
        show:false
      })
    }
  }
})