import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'comment'

export const commentService = {
  query,
  getById,
  save,
  remove,
  addCommentMsg,
  getDefaultFilter,
}
window.cs = commentService

async function query(filterBy = { txt: '', price: 0 }) {
  var comments = await storageService.query(STORAGE_KEY)
  const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    comments = comments.filter(
      (comment) => regex.test(comment.vendor) || regex.test(comment.description)
    )
  }
  if (minSpeed) {
    comments = comments.filter((comment) => comment.speed >= minSpeed)
  }
  if (sortField === 'vendor' || sortField === 'owner') {
    comments.sort(
      (comment1, comment2) =>
        comment1[sortField].localeCompare(comment2[sortField]) * +sortDir
    )
  }
  if (sortField === 'price' || sortField === 'speed') {
    comments.sort(
      (comment1, comment2) =>
        (comment1[sortField] - comment2[sortField]) * +sortDir
    )
  }

  comments = comments.map(({ _id, vendor, price, speed, owner }) => ({
    _id,
    vendor,
    price,
    speed,
    owner,
  }))
  return comments
}

function getById(commentId) {
  return storageService.get(STORAGE_KEY, commentId)
}

async function remove(commentId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, commentId)
}

async function save(comment) {
  var savedComment
  if (comment._id) {
    const commentToSave = {
      _id: comment._id,
      price: comment.price,
      speed: comment.speed,
    }
    savedComment = await storageService.put(STORAGE_KEY, commentToSave)
  } else {
    const commentToSave = {
      vendor: comment.vendor,
      price: comment.price,
      speed: comment.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: [],
    }
    savedComment = await storageService.post(STORAGE_KEY, commentToSave)
  }
  return savedComment
}

async function addCommentMsg(commentId, txt) {
  // Later, this is all done by the backend
  const comment = await getById(commentId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  comment.msgs.push(msg)
  await storageService.put(STORAGE_KEY, comment)

  return msg
}

function getDefaultFilter() {
  return {
    txt: '',
  }
}
