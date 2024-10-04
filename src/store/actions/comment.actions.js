import { commentService } from '../../services/comment/comment.service'
import { store } from '../store'
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_COMMENTS,
  SET_COMMENT,
  SET_EDIT_COMMENT,
  UPDATE_COMMENT,
  ADD_COMMENT_MSG,
} from '../reducers/comment.reducer'

export async function loadComments(filterBy) {
  try {
    const comments = await commentService.query(filterBy)
    store.dispatch(getCmdSetComments(comments))
  } catch (err) {
    console.log('Cannot load comments', err)
    throw err
  }
}

export async function loadComment(commentId) {
  try {
    const comment = await commentService.getById(commentId)
    store.dispatch(getCmdSetComment(comment))
  } catch (err) {
    console.log('Cannot load comment', err)
    throw err
  }
}

export async function removeComment(commentId) {
  try {
    await commentService.remove(commentId)
    store.dispatch(getCmdRemoveComment(commentId))
  } catch (err) {
    console.log('Cannot remove comment', err)
    throw err
  }
}

export async function addComment(comment) {
  try {
    const savedComment = await commentService.save(comment)
    store.dispatch(getCmdAddComment(savedComment))
    return savedComment
  } catch (err) {
    console.log('Cannot add comment', err)
    throw err
  }
}

export async function updateComment(comment) {
  try {
    const savedComment = await commentService.save(comment)
    store.dispatch(getCmdUpdateComment(savedComment))
    return savedComment
  } catch (err) {
    console.log('Cannot save comment', err)
    throw err
  }
}

export function setEditComment(comment) {
  store.dispatch({ type: SET_EDIT_COMMENT, editComment: comment })
}

export async function addCommentMsg(commentId, txt) {
  try {
    const msg = await commentService.addCommentMsg(commentId, txt)
    store.dispatch(getCmdAddCommentMsg(msg))
    return msg
  } catch (err) {
    console.log('Cannot add comment msg', err)
    throw err
  }
}

// Command Creators:
function getCmdSetComments(comments) {
  return {
    type: SET_COMMENTS,
    comments,
  }
}
function getCmdSetComment(comment) {
  return {
    type: SET_COMMENT,
    comment,
  }
}
function getCmdRemoveComment(commentId) {
  return {
    type: REMOVE_COMMENT,
    commentId,
  }
}
function getCmdAddComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}
function getCmdUpdateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment,
  }
}
function getCmdAddCommentMsg(msg) {
  return {
    type: ADD_COMMENT_MSG,
    msg,
  }
}

// unitTestActions()
async function unitTestActions() {
  await loadComments()
  await addComment(commentService.getEmptyComment())
  await updateComment({
    _id: 'm1oC7',
    title: 'Comment-Good',
  })
  await removeComment('m1oC7')
  // TODO unit test addCommentMsg
}
