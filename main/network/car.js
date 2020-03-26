/*购物车接口
*/
import network from '../../network/network.js';

/**
 * 获取购物车列表
*/
export function getCartList(data) {
  return network({
    url: 'getCartList',
    data: data,
    hideLoading:true,
    hideErrToast:true
  })
}

/**
 * 购物车列表购买项修改
*/
export function editCart(data) {
  return network({
    url: 'editCart',
    data: data,
    method:'POST',
    hideLoading: true,
    hideErrToast: true
  })
}

/**
 * 购物车清空下架产品
*/
export function delInvaildCart(data) {
  return network({
    url: 'delInvaildCart',
    data: data,
    hideLoading: true,
    hideErrToast: true
  })
}

