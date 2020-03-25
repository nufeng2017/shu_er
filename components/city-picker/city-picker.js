Component({
  properties: {
    list:{
      type:Array
    },
    value:Array
  },
  methods: {
    bindChange(e){
      console.log(e)
      this.triggerEvent('change', e.detail.value);
    },
    cancel(){
      this.triggerEvent('cancel');
    },
    confirm(){
      this.triggerEvent('confirm');
    }
  }
})