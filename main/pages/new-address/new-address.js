import { addAddress,getArea } from '../../network/manage-address.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitData: {//提交数据
      receive_username:'',//收货人姓名
      receive_phone:'',//手机号码
      province_id:'',//省ID
      city_id:'',//城市ID
      area_id:'',//区域ID
      address:'',//详细地址
      is_default:0,//是否默认
    },
    areaVal:'',//区域
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],//区域数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArea();//获得区域列表
  },
  inputTxt(e){
    console.log(e)
    let val = e.detail;
    let item = e.currentTarget.dataset.item;
    this.setData({
      ['submitData.' + item]:val
    });
  },
  getArea(){
    getArea().then((res)=>{
      
    });
  },
  popupShow(){

  },
  selectCity(){
    console.log(1111)
  }
})