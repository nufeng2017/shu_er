import {addComplaint} from '../../network/complaint.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_content: '',
    phone: ''
  },
  onLoad(){
    this.setData({
      phone:wx.getStorageSync('user_info').phone
    })
  },
  inputContent(e){
    let val = e.detail;
    this.setData({
      c_content:val
    });
  },
  inputNum(e){
    let val = e.detail;
    this.setData({
      phone: val
    });
  },
  submit() {
    if (this.data.c_content.length == 0 || this.data.phone.toString().length == 0){
      wx.showToast({
        title: '请填写投诉内容和您的联系方式！',
        icon: 'none'
      })
      return;
    }
    addComplaint({
      user_id:wx.getStorageSync('user_id'),
      c_content: this.data.c_content,
      phone:this.data.phone
    }).then((res) => {
      wx.showToast({
        title: '感谢您反映的问题或建议！',
        icon:'none'
      })
      setTimeout(()=>{
        wx.navigateBack({})
      },2000);
    });
  }
})