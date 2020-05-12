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

/**
 * 查询余额
 */
export function getAccount(data) {
  return network({
    url: 'getAccount',
    data: data
  })
}

/**
 * 查询员工
 */
export function getStorePeople(data) {
  return network({
    url: 'getStorePeople',
    data: data
  })
}

