import { Link } from 'react-router-dom'

export function CommentPreview({ comment }) {
  console.log(comment)
  return (
    <article className='preview'>
      <div className='img-container'>
        {comment.owner && <img src={comment.owner.imgUrl} alt='' />}
      </div>
      <div className='title-container'>
        <Link to={`/comment/${comment._id}`}>{comment.title}</Link>
        <span>{comment.email}</span>
      </div>
    </article>
  )
}
