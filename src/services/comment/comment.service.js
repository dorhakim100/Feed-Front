import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user/user.service'

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

async function query(filterBy = { txt: '', dateAdded: '', sortDir: 1 }) {
  var comments = await storageService.query(STORAGE_KEY)
  const { txt, dateAdded, sortDir } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    comments = comments.filter(
      (comment) =>
        regex.test(comment.title) ||
        regex.test(comment.text) ||
        regex.test(comment.email)
    )
  }
  if (dateAdded) {
  }

  if (sortDir !== undefined) {
    comments = comments.sort((comment1, comment2) => {
      return comment1.title.localeCompare(comment2.title) * sortDir
    })
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
      email: comment.email,
      title: comment.title,
      text: comment.text,
      dateAdded: comment.dateAdded,
      owner: comment.owner,
    }
    savedComment = await storageService.put(STORAGE_KEY, commentToSave)
  } else {
    const commentToSave = {
      email: comment.email,
      title: comment.title,
      text: comment.text,
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
    sortDir: 1,
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
    {
      _id: 'k3f6a',
      email: 'michael.brown@gmail.com',
      title: 'Very Informative!',
      txt: 'The insights you shared were extremely useful. Thanks for the clarity!',
      dateAdded: '2024-10-02',
      owner: {
        id: 'b9x4m',
        fullname: 'Michael Brown',
        imgUrl:
          'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png',
      },
    },
    {
      _id: 'k3f6a',
      email: 'michael.brown@gmail.com',
      title: 'Very Informative!',
      txt: 'The insights you shared were extremely useful. Thanks for the clarity!',
      dateAdded: '2024-10-02',
      owner: {
        id: 'b9x4m',
        fullname: 'Michael Brown',
        imgUrl:
          'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png',
      },
    },
    {
      _id: 'l5g2d',
      email: 'sara.connor@outlook.com',
      title: 'Great Explanation',
      txt: 'Your detailed explanation helped me understand the topic much better. Thank you!',
      dateAdded: '2024-10-02',
      owner: {
        id: 'c7h9j',
        fullname: 'Sara Connor',
        imgUrl: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      },
    },
    {
      _id: 'o7n1b',
      email: 'steven.king@hotmail.com',
      title: 'Highly Appreciated!',
      txt: 'I appreciate the effort you put into addressing all my questions. Great work!',
      dateAdded: '2024-10-02',
      owner: {
        id: 'j6f5e',
        fullname: 'Steven King',
        imgUrl:
          'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      },
    },
    {
      _id: 'p4l8v',
      email: 'anna.baker@gmail.com',
      title: 'Great Work!',
      txt: 'Your dedication to the task really shows. Thank you for the fantastic support!',
      dateAdded: '2024-10-02',
      owner: {
        id: 't3r6z',
        fullname: 'Anna Baker',
        imgUrl:
          'https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png',
      },
    },
    {
      _id: 'r6h7y',
      email: 'emma.jones@aol.com',
      title: 'Fantastic Service',
      txt: 'The way you handled everything was very professional. Thanks a lot!',
      dateAdded: '2024-10-02',
      owner: {
        id: 'v4t5u',
        fullname: 'Emma Jones',
        imgUrl: 'https://cdn-icons-png.flaticon.com/512/194/194935.png',
      },
    },
    {
      _id: 's8x3m',
      email: 'daniel.carter@yahoo.com',
      title: 'Thank You!',
      txt: 'Thanks for your patience and detailed assistance. It was really helpful.',
      dateAdded: '2024-10-02',
      owner: {
        id: 'u1n2k',
        fullname: 'Daniel Carter',
        imgUrl:
          'https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/60-512.png',
      },
    },
    {
      _id: 't2d9k',
      email: 'lucy.hale@gmail.com',
      title: 'Well Done!',
      txt: 'I really appreciate how you went the extra mile to provide support.',
      dateAdded: '2024-10-02',
      owner: {
        id: 'q7p8w',
        fullname: 'Lucy Hale',
        imgUrl:
          'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png',
      },
    },
    {
      _id: 'u9m5q',
      email: 'robert.white@protonmail.com',
      title: 'Thanks for the Effort',
      txt: 'Thank you for addressing all my concerns in detail. Much appreciated!',
      dateAdded: '2024-10-02',
      owner: {
        id: 'o3y2a',
        fullname: 'Robert White',
        imgUrl: 'https://cdn-icons-png.flaticon.com/512/194/194931.png',
      },
    },
    {
      _id: 'v6n4e',
      email: 'nancy.davis@hotmail.com',
      title: 'Very Helpful!',
      txt: 'Thanks for the quick response and the clear guidance. You really helped me out.',
      dateAdded: '2024-10-02',
      owner: {
        id: 'l2h7r',
        fullname: 'Nancy Davis',
        imgUrl:
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
      },
    },
    {
      _id: 'w5t3o',
      email: 'henry.martin@gmail.com',
      title: 'Excellent Support',
      txt: 'The support you provided was exceptional. Thanks a lot!',
      dateAdded: '2024-10-02',
      owner: {
        id: 'n4b8f',
        fullname: 'Henry Martin',
        imgUrl:
          'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png',
      },
    },
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
}
