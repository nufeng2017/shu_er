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
      addComment({
        user_id:wx.getStorageSync('user_id'),
        pid: this.data.info.pid,
        star:this.data.value,
        content: this.data.content
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