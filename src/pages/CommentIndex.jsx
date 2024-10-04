import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  loadComments,
  addComment,
  updateComment,
  removeComment,
  addCommentMsg,
} from '../store/actions/comment.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { commentService } from '../services/comment/comment.service'
import { userService } from '../services/user/user.service'

import { CommentList } from '../cmps/CommentList'
import { CommentFilter } from '../cmps/CommentFilter'
import { Form } from '../cmps/Form'

export function CommentIndex() {
  const [filterBy, setFilterBy] = useState(commentService.getDefaultFilter())
  // console.log(filterBy)
  const comments = useSelector(
    (storeState) => storeState.commentModule.comments
  )
  // console.log(comments)

  const [isEdit, setIsEdit] = useState(false)
  const editComment = useSelector(
    (stateSelector) => stateSelector.commentModule.editComment
  )
  useEffect(() => {
    loadComments(filterBy)
  }, [filterBy])

  async function onRemoveComment(commentId) {
    try {
      await removeComment(commentId)
      showSuccessMsg('Comment removed')
    } catch (err) {
      showErrorMsg('Cannot remove comment')
    }
  }

  async function onAddComment(comment) {
    try {
      const savedComment = await addComment(comment)
      console.log(savedComment)
      showSuccessMsg('Comment added')
    } catch (err) {
      console.log(err)
      showErrorMsg(`Couldn't add comment`)
    }
  }

  async function onUpdateComment(comment) {
    // setIsEdit(true)
    console.log(comment)
    console.log(editComment)
    // const commentToSave = { ...comment, speed }
    try {
      const savedComment = await updateComment(editComment)
      showSuccessMsg(`Comment updated`)
      setIsEdit(false)
    } catch (err) {
      showErrorMsg('Cannot update comment')
    }
  }

  return (
    <main className='comment-index'>
      <header>
        {/* {userService.getLoggedinUser() && (
          <button onClick={onAddComment}>Add a Comment</button>
        )} */}
      </header>
      <Form onAddComment={onAddComment} />
      <CommentFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <CommentList
        comments={comments}
        onRemoveComment={onRemoveComment}
        onUpdateComment={onUpdateComment}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </main>
  )
}
