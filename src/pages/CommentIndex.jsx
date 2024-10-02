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
import { userService } from '../services/user'

import { CommentList } from '../cmps/CommentList'
import { CommentFilter } from '../cmps/CommentFilter'

export function CommentIndex() {
  const [filterBy, setFilterBy] = useState(commentService.getDefaultFilter())
  const comments = useSelector(
    (storeState) => storeState.commentModule.comments
  )
  console.log(comments)

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

  async function onAddComment() {
    const comment = commentService.getEmptyComment()
    comment.vendor = prompt('Vendor?')
    try {
      const savedComment = await addComment(comment)
      showSuccessMsg(`Comment added (id: ${savedComment._id})`)
    } catch (err) {
      showErrorMsg('Cannot add comment')
    }
  }

  async function onUpdateComment(comment) {
    const speed = +prompt('New speed?', comment.speed)
    if (speed === 0 || speed === comment.speed) return

    const commentToSave = { ...comment, speed }
    try {
      const savedComment = await updateComment(commentToSave)
      showSuccessMsg(`Comment updated, new speed: ${savedComment.speed}`)
    } catch (err) {
      showErrorMsg('Cannot update comment')
    }
  }

  return (
    <main className='comment-index'>
      <header>
        <h2>Comments</h2>
        {userService.getLoggedinUser() && (
          <button onClick={onAddComment}>Add a Comment</button>
        )}
      </header>
      <CommentFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <CommentList
        comments={comments}
        onRemoveComment={onRemoveComment}
        onUpdateComment={onUpdateComment}
      />
    </main>
  )
}
