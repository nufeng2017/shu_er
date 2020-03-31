/*支付接口
*/
import network from './network.js';

/**
 * 获取购物车列表
*/
export function pay(data) {
  return network({
    url: 'pay',
    data: data,
  })
}


