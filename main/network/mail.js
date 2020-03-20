/*商城接口
*/
import network from '../../network/network.js';

/**
 * 获取首页数据
*/
export function getProductList (data) {
  return network({
    url: 'getProductList',
    data: data
  })
}