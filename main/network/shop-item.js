/*购物车接口
*/
import network from '../../network/network.js';

/**
 * 添加购物车
*/
export function addCart(data) {
  return network({
    url: 'addCart',
    data: data,
    method: 'POST',
    hideLoading:true
  })
}