import { httpService } from '../http.service'

export const commentService = {
  query,
  getById,
  save,
  remove,
  addCommentMsg,
}

async function query(filterBy = { txt: '', price: 0 }) {
  return httpService.get(`comment`, filterBy)
}

function getById(commentId) {
  return httpService.get(`comment/${commentId}`)
}

async function remove(commentId) {
  return httpService.delete(`comment/${commentId}`)
}
async function save(comment) {
  var savedComment
  if (comment._id) {
    savedComment = await httpService.put(`comment/${comment._id}`, comment)
  } else {
    savedComment = await httpService.post('comment', comment)
  }
  return savedComment
}

async function addCommentMsg(commentId, txt) {
  const savedMsg = await httpService.post(`comment/${commentId}/msg`, { txt })
  return savedMsg
}
