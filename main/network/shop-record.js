/*消费记录接口
*/
import network from '../../network/network.js';

/**
 * 获取购物车列表
*/
export function getConsumeLog(data) {
  return network({
    url: 'getConsumeLog',
    data: data,
  })
}


