/*附近门店接口
*/
import network from '../../network/network.js';

/**
 * 获取附近门店列表
*/
export function getStoreList(data) {
  return network({
    url: 'getStoreList',
    data: data,
    hideLoading:true
  })
}