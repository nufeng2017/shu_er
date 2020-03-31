/*充值接口
 */
import network from '../../network/network.js';

/**
 * 充值
 */
export function rechargeCard(data) {
  return network({
    url: 'rechargeCard',
    data: data,
    method: 'POST',
  })
}

