/*地址管理接口
 */
import network from '../../network/network.js';

/**
 * 获取收货列表
 */
export function getAddressList(data) {
  return network({
    url: 'getAddressList',
    data: data,
    hideLoading: true,
    hideErrToast: true,
  })
}

/**
 * 新增或修改收货地址
 */
export function addAddress(data) {
  return network({
    url: 'addAddress',
    data: data,
    method:'POST'
  })
}

/**
 * 删除收货地址
 */
export function deleteAddress(data) {
  return network({
    url: 'deleteAddress',
    data: data,
    method: 'POST'
  })
}