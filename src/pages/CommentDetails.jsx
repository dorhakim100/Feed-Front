import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadComment, addCommentMsg } from '../store/actions/comment.actions'

export function CommentDetails() {
  const { commentId } = useParams()
  const comment = useSelector((storeState) => storeState.commentModule.comment)

  useEffect(() => {
    loadComment(commentId)
  }, [commentId])

  async function onAddCommentMsg(commentId) {
    try {
      await addCommentMsg(commentId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Comment msg added`)
    } catch (err) {
      showErrorMsg('Cannot add comment msg')
    }
  }

  return (
    <section className='comment-details'>
      <Link to='/comment'>Back to list</Link>
      <h1>Comment Details</h1>
      {comment && (
        <div>
          <h3>{comment.vendor}</h3>
          <h4>${comment.price}</h4>
          <pre> {JSON.stringify(comment, null, 2)} </pre>
        </div>
      )}
      <button
        onClick={() => {
          onAddCommentMsg(comment._id)
        }}
      >
        Add comment msg
      </button>
    </section>
  )
}
