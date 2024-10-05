import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadComment, addCommentMsg } from '../store/actions/comment.actions'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export function CommentDetails() {
  const { commentId } = useParams()
  const comment = useSelector((storeState) => storeState.commentModule.comment)
  console.log(comment)

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
      <Link to='/comment'>
        <ArrowBackIcon />
      </Link>

      {comment && (
        <div className='comment-details-container'>
          <div className='user-container'>
            <img src={comment.owner.imgUrl} alt='' />
            <b>{comment.owner.fullname}</b>
          </div>
          <div className='title-container'>
            <span>{comment.dateAdded}</span>
          </div>
          <b>{comment.title}</b>
          <p>{comment.txt}</p>
        </div>
      )}
    </section>
  )
}
