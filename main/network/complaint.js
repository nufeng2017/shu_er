/*投诉接口
*/
import network from '../../network/network.js';

/**
 * 获取购物车列表
*/
export function addComplaint(data) {
  return network({
    url: 'addComplaint',
    data: data,
    method:'POST'
  })
}



