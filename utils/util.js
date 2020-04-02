import { getStorage, setStorage } from '../cache/cache.js';

const formatTime = date => { //获得日期格式
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const login = (e) => {
  let url = e.currentTarget.dataset.url;
  if (!getStorage('user_id')) {
    wx.navigateTo({
      url: '/main/pages/logs/logs',
    })
  } else {
    wx.navigateTo({
      url: url,
    })
  }
}

const getLocation = (_self) => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          if (getStorage('user_id')){
            _self.setData({
              showPopup: true
            })
          }
        }
        wx.getLocation({
          type: 'wgs84',
          complete(res) {
            resolve(res)
          }
        })
      }
    }) 
  })
}
module.exports = {
  formatTime: formatTime, //获得日期格式
  login: login, //检查是否需要登录
  getLocation: getLocation,//获得位置信息
}