/*订单详情页
*/
import network from '../../network/network.js';


/**
 * 普通登录
*/
export function getOrderInfo(data) {
  return network({
    url: 'getOrderInfo',
    data: data,
  })
}

