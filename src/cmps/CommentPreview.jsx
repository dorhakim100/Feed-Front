import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { commentService } from '../services/comment/comment.service'
import { showErrorMsg } from '../services/event-bus.service'

import { setEditComment } from '../store/actions/comment.actions'

export function CommentPreview({ comment, isEdit }) {
  const editComment = useSelector(
    (stateSelector) => stateSelector.commentModule.editComment
  )
  useEffect(() => {
    // setEditComment(comment)
    console.log(editComment)
  }, [editComment])
  function handleChange({ target }) {
    const field = target.name
    // if (
    //   field === 'email' &&
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(target.value)
    // ) {
    //   showErrorMsg('Enter valid email')
    //   return
    // }

    setEditComment({ ...editComment, [field]: target.value })
  }
  return (
    <article className='preview'>
      <div className='img-container'>
        {comment.owner && <img src={comment.owner.imgUrl} alt='' />}
      </div>
      <div className='title-container'>
        {isEdit && editComment._id === comment._id ? (
          <input
            className='editable-input title'
            type='text'
            name='title'
            id=''
            value={editComment.title}
            onChange={handleChange}
            placeholder='Title'
          />
        ) : (
          <Link to={`/comment/${comment._id}`}>{comment.title}</Link>
        )}
        {isEdit && editComment._id === comment._id ? (
          <input
            className='editable-input'
            type='text'
            name='email'
            id=''
            value={editComment.email}
            onChange={handleChange}
            placeholder='Email'
          />
        ) : (
          <span>{comment.email}</span>
        )}
      </div>
      <b>{comment.dateAdded}</b>
    </article>
  )
}
