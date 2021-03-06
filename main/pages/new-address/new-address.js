import { addAddress } from '../../network/manage-address.js';
import areaList from '../../../utils/area.js';
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
    popupShow:false,
    areaList:[],//本地列表
    value:[0,0,0],
    province:'',
    city:'',
    area:'',
    showCheckbox:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArea();//获得区域列表
    if (options.item){
      this.getInfo(JSON.parse(options.item));
    }
  },
  getInfo(data){
    console.log(data)
    let o = {
      receive_username: data.receive_username,//收货人姓名
      receive_phone: data.receive_phone,//手机号码
      province_id: data.province_id,//省ID
      city_id: data.city_id,//城市ID
      area_id: data.area_id,//区域ID
      address: data.address,//详细地址
      is_default: data.is_default,//是否默认
      address_id: data.address_id
    }
    this.setData({
      submitData:o,
      area: data.area_name,
      city: data.city_name,
      province: data.province_name,
      showCheckbox:false
    })
  },
  inputTxt(e){
    let val = e.detail;
    let item = e.currentTarget.dataset.item;
    this.setData({
      ['submitData.' + item]:val
    });
  },
  getArea(){
    this.setData({
      areaList: areaList
    });
  },
  change(e){
    this.setData({
      value: e.detail
    });
  },
  popupShow(){
    this.setData({ popupShow: true });
  },
  confirm(e){
    console.log(this.data.value)
    this.setData({
      'province': this.data.areaList[this.data.value[0]].title,
      'city': this.data.areaList[this.data.value[0]].children[this.data.value[1]].title,
      'area': this.data.areaList[this.data.value[0]].children[this.data.value[1]].children ? this.data.areaList[this.data.value[0]].children[this.data.value[1]].children[this.data.value[2]].title : '',
      'submitData.province_id': this.data.areaList[this.data.value[0]].aid,
      'submitData.city_id': this.data.areaList[this.data.value[0]].children[this.data.value[1]].aid,
      'submitData.area_id': this.data.areaList[this.data.value[0]].children[this.data.value[1]].children ? this.data.areaList[this.data.value[0]].children[this.data.value[1]].children[this.data.value[2]].aid:'',
      popupShow: false
    });
  },
  cancel(){
    this.setData({ popupShow: false });
  },
  checkbox(e){
    this.setData({
      'submitData.is_default': Number(!this.data.submitData.is_default)
    })
  },
  saveAddress(){
    let data = this.data.submitData;
    data.user_id = wx.getStorageSync('user_id');
    addAddress(data).then((res) => {
      wx.navigateBack();
    });
  }
})