
Component({
  properties: {
    title: String,//弹窗标题
    show: Boolean,//是否显示弹窗
    showCancel:{
      type:Boolean,
      value:true
    },
    overlay:{
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
    showCloseBtn:{
      type:Boolean,
      value:true
    }
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