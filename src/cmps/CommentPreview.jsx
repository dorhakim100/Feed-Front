import { Link } from 'react-router-dom'

export function CommentPreview({ comment }) {
  return (
    <article className='preview'>
      <header>
        <Link to={`/comment/${comment._id}`}>{comment.vendor}</Link>
      </header>

      <p>
        Speed: <span>{comment.speed.toLocaleString()} Km/h</span>
      </p>
      {comment.owner && (
        <p>
          Owner: <span>{comment.owner.fullname}</span>
        </p>
      )}
    </article>
  )
}
