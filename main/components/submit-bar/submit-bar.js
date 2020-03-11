Component({
  properties: {
    checkAll: Boolean,
    price:String,
    submitCount:Number,
    hasFreight:String
  },
  methods: {
    change(e){
      this.triggerEvent('checkall',e.detail);
    },
    submit(){
      this.triggerEvent('submit');
    },
  }
})