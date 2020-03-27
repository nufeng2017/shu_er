/*首页接口
*/
import network from '../../network/network.js';

/**
 * 获取首页数据
*/
export function getIndex(data) {
  return network({
    url: 'getIndex',
    data: data,
    hideLoading:true
  })
}


/**
 * 配置列表
*/
export function getConfig(data) {
  return network({
    url: 'getConfig',
    data: data,
    notNeedHideLoding: true
  })
}
