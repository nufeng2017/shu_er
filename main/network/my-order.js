/*我的订单接口
*/
import network from '../../network/network.js';

/**
 * 我的订单列表
*/
export function getOrderList(data) {
  return network({
    url: 'getOrderList',
    data: data
  })
}

/**
 * 取消订单
*/
export function cancelOrder(data) {
  return network({
    url: 'cancelOrder',
    data: data
  })
}