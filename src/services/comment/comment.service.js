import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'comment'

if (!localStorage.getItem(STORAGE_KEY)) {
  _createComments()
}

export const commentService = {
  query,
  getById,
  save,
  remove,
  addCommentMsg,
  getDefaultFilter,
}
window.cs = commentService

async function query(filterBy = { txt: '', dateAdded: '', sortDirection: 1 }) {
  var comments = await storageService.query(STORAGE_KEY)
  const { txt, dateAdded, sortDirection } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    comments = comments.filter(
      (comment) => regex.test(comment.vendor) || regex.test(comment.description)
    )
  }
  if (dateAdded) {
  }

  if (sortDirection) {
  }

  return comments
}

function getById(commentId) {
  try {
    return storageService.get(STORAGE_KEY, commentId)
  } catch (err) {
    console.log(err)
  }
}

async function remove(commentId) {
  // throw new Error('Nope')
  try {
    await storageService.remove(STORAGE_KEY, commentId)
  } catch (err) {
    console.log(err)
  }
}

async function save(comment) {
  var savedComment
  if (comment._id) {
    const commentToSave = {
      _id: comment._id,
      txt: comment.txt,
      dateAdded: comment.dateAdded,
      owner: comment.owner,
    }
    savedComment = await storageService.put(STORAGE_KEY, commentToSave)
  } else {
    const commentToSave = {
      txt: comment.txt,
      dateAdded: new Date().toISOString(),
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
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
    dateAdded: '',
    sortDirection: 1,
  }
}

function _createComments() {
  const comments = [
    {
      _id: 's6sfr',
      email: 'dorhakim100@gmail.com',
      title: 'Grateful for the Help',
      txt: 'Thank you so much for the quick response and the detailed explanation. It really made a difference!',
      dateAdded: '2024-09-28',
      owner: {
        id: 'af8w2',
        fullname: 'Dor Hakim',
        imgUrl:
          'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png',
      },
    },
    {
      _id: 'h7btr',
      email: 'john.doe@gmail.com',
      title: 'Fantastic Job!',
      txt: 'I just wanted to say that the work you delivered exceeded my expectations. Keep up the great effort!',
      dateAdded: '2024-09-29',
      owner: {
        id: 'a9k2l',
        fullname: 'John Doe',
        imgUrl:
          'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
      },
    },
    {
      _id: 'u8w4s',
      email: 'jane.smith@hotmail.com',
      title: 'Helpful and Clear',
      txt: 'The information you provided was extremely helpful. It really clarified a lot of things I had been struggling with.',
      dateAdded: '2024-09-30',
      owner: {
        id: 'd5p9x',
        fullname: 'Jane Smith',
        imgUrl:
          'https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid',
      },
    },
    {
      _id: 'i9m2q',
      email: 'alice.wonder@aol.com',
      title: 'Much Appreciated',
      txt: 'I truly appreciate the effort and attention to detail in your response. It was exactly what I needed.',
      dateAdded: '2024-10-01',
      owner: {
        id: 'e3r7v',
        fullname: 'Alice Wonder',
        imgUrl:
          'https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_female_user-512.png',
      },
    },
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
}
