import { userService } from '../services/user/user.service'
import { CommentPreview } from './CommentPreview'
import { setEditComment } from '../store/actions/comment.actions'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'

export function CommentList({
  comments,
  onRemoveComment,
  onUpdateComment,
  isEdit,
  setIsEdit,
}) {
  function shouldShowActionBtns(comment) {
    const user = userService.getLoggedinUser()

    if (!user) return false
    if (user.isAdmin) return true
    return comment.owner?._id === user._id
  }

  return (
    <section>
      <ul className='list'>
        {comments.map((comment) => (
          <li key={comment._id}>
            <CommentPreview comment={comment} isEdit={isEdit} />
            {shouldShowActionBtns(comment) && (
              <div className='actions'>
                {isEdit ? (
                  <button onClick={() => onUpdateComment(comment)}>Save</button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEdit(true)
                      setEditComment(comment)
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    if (isEdit) {
                      setIsEdit(false)
                      return
                    }
                    onRemoveComment(comment._id)
                  }}
                >
                  {isEdit ? <CloseIcon /> : <DeleteIcon />}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
