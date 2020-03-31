import { addComment } from './network/comment.js'
const app = getApp();
Component({
  properties: {
    show: Boolean,
    info:Object
  },
  data:{
    value:'',
    content:''
  },
  methods: {
    confirm(){
      console.log(this.data.info)
      addComment({
        user_id:wx.getStorageSync('user_id'),
        pid: this.data.info.products[0].pid,
        star:this.data.value,
        content: this.data.content,
        type: this.data.info.products[0].type,
        oid: this.data.info.oid
      }).then((res)=>{
        this.triggerEvent('comment');
      });
    },
    onChange(event) {
      this.setData({
        value: event.detail
      });
    },
    inputTxt(e){
      let val = e.detail.value;
      this.setData({
        content: val
      });
    }
  }
})