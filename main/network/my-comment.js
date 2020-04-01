/*我的评价接口
*/
import network from '../../network/network.js';

/**
 * 我的评论列表
 *
*/
export function getMyCommentList(data) {
  return network({
    url: 'getMyCommentList',
    data: data
  })
}
/**
 * 删除评论
 *
*/
export function deleteComment(data) {
  return network({
    url: 'deleteComment',
    data: data
  })
}
