/*生成订单接口
 */
import network from '../../network/network.js';

/**
 * 获取订单ID
 */
export function confirmOrder(data) {
  return network({
    url: 'confirmOrder',
    data: data,
    method:'POST',
    notNeedHideLoding:true
  })
}


/**
 * 获取确认订单信息
 */
export function getConfirmOrder(data) {
  return network({
    url: 'getConfirmOrder',
    data: data,
    hideLoading: true,
    method: 'POST'
  })
}
/**
 * 获取确认订单信息
 */
export function changeAddress(data) {
  return network({
    url: 'changeAddress',
    data: data,
    hideLoading: true,
    hideErrToast:true
  })
}
