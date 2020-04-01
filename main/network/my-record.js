/*流水接口
*/
import network from '../../network/network.js';

/**
 * 获取流水
*/
export function getCardLog(data) {
  return network({
    url: 'getCardLog',
    data: data,
  })
}


