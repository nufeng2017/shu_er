/*加盟商接口接口
*/
import network from '../../network/network.js';

/**
 * 加盟商内容
*/
export function getBusinessContent(data) {
  return network({
    url: 'getBusinessContent',
    data: data
  })
} 