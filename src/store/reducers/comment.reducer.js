import { commentService } from '../../services/comment/comment.service'

export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_COMMENT = 'SET_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT_MSG = 'ADD_COMMENT_MSG'
export const SET_EDIT_COMMENT = 'SET_EDIT_COMMENT'

const initialState = {
  comments: [],
  comment: null,
  editComment: commentService.getEmptyComment(),
}

export function commentReducer(state = initialState, action) {
  var newState = state
  var comments
  switch (action.type) {
    case SET_COMMENTS:
      newState = { ...state, comments: action.comments }
      break
    case SET_COMMENT:
      newState = { ...state, comment: action.comment }
      break
    case REMOVE_COMMENT:
      const lastRemovedComment = state.comments.find(
        (comment) => comment._id === action.commentId
      )
      comments = state.comments.filter(
        (comment) => comment._id !== action.commentId
      )
      newState = { ...state, comments, lastRemovedComment }
      break
    case ADD_COMMENT:
      newState = { ...state, comments: [...state.comments, action.comment] }
      break
    case UPDATE_COMMENT:
      comments = state.comments.map((comment) =>
        comment._id === action.comment._id ? action.comment : comment
      )
      newState = { ...state, comments }
      break
    case ADD_COMMENT_MSG:
      newState = {
        ...state,
        comment: {
          ...state.comment,
          msgs: [...(state.comment.msgs || []), action.msg],
        },
      }
      break
    case SET_EDIT_COMMENT:
      newState = {
        ...state,
        editComment: action.editComment,
      }
    default:
  }
  return newState
}

// unitTestReducer()

function unitTestReducer() {
  var state = initialState
  const comment1 = {
    _id: 'b101',
    vendor: 'Comment ' + parseInt(Math.random() * 10),
    msgs: [],
  }
  const comment2 = {
    _id: 'b102',
    vendor: 'Comment ' + parseInt(Math.random() * 10),
    msgs: [],
  }

  state = commentReducer(state, { type: SET_COMMENTS, comments: [comment1] })
  console.log('After SET_COMMENTS:', state)

  state = commentReducer(state, { type: ADD_COMMENT, comment: comment2 })
  console.log('After ADD_COMMENT:', state)

  state = commentReducer(state, {
    type: UPDATE_COMMENT,
    comment: { ...comment2, vendor: 'Good' },
  })
  console.log('After UPDATE_COMMENT:', state)

  state = commentReducer(state, {
    type: REMOVE_COMMENT,
    commentId: comment2._id,
  })
  console.log('After REMOVE_COMMENT:', state)

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = commentReducer(state, {
    type: ADD_COMMENT_MSG,
    commentId: comment1._id,
    msg,
  })
  console.log('After ADD_COMMENT_MSG:', state)

  state = commentReducer(state, {
    type: REMOVE_COMMENT,
    commentId: comment1._id,
  })
  console.log('After REMOVE_COMMENT:', state)
}
