/*详情接口
*/
import network from '../../network/network.js';

/**
 * 添加购物车
*/
export function getProductInfo(data) {
  return network({
    url: 'getProductInfo',
    data: data
  })
}  