/*我的投诉接口
*/
import network from '../../network/network.js';

/**
 * 我的投诉列表
 *
*/
export function getComplaintList(data) {
  return network({
    url: 'getComplaintList',
    data: data
  })
}
