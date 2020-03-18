/*登录页面接口
*/
import network from '../../network/network.js';


/**
 * 获取验证码
*/
export function loginByCode (data){
  return network({
    url:'loginByCode',
    data:data,
    method:'POST'
  })
}

/**
 * 登录
*/
export function sendCode(data) {
  return network({
    url: 'sendCode',
    data: data
  })
}