import {addComplaint} from '../../network/complaint.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_content: '',
    phone: ''
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
    addComplaint({
      user_id:wx.getStorageSync('user_id'),
      c_content: this.data.content,
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