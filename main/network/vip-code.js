/*会员码接口
*/
import network from '../../network/network.js';

/**
 * 会员码
*/
export function getCardCode(data) {
  return network({
    url: 'getCardCode',
    data: data
  })
}  