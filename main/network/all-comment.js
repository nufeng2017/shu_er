/*商品详情评价接口
*/
import network from '../../network/network.js';

/**
 * 更多评价列表
 *
*/
export function getCommentList(data) {
  return network({
    url: 'getCommentList',
    data: data
  })
}

