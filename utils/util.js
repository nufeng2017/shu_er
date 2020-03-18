const formatTime = date => {//获得日期格式
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

const loginInfo = () => {
  wx.checkSession({
    success() {
      //session_key 未过期，并且在本生命周期一直有效
    },
    fail() {
      console.log(111)
      //wx.login() //重新登录
    }
  })
}

module.exports = {
  formatTime: formatTime
}
