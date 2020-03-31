import network from '../../../../network/network.js'

/**
 * 评价
 *
*/
export function addComment(data) {
  return network({
    url: 'addComment',
    data: data,
    method:'POST'
  })
}