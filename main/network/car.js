/*首页接口
*/
import network from '../../network/network.js';

/**
 * 获取首页数据
*/
export function getCartList(data) {
  return network({
    url: 'getCartList',
    data: data,
    hideLoading:true,
    hideErrToast:true
  })
}
