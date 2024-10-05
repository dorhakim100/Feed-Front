import { useState, useEffect } from 'react'
import { commentService } from '../services/comment/comment.service'
import { Button } from '@mui/material'
import { CommentFilter } from './CommentFilter.jsx'
import { loadComments } from '../store/actions/comment.actions'

export function RandomComments() {
  const [randomComments, setRandomComments] = useState([
    commentService.getEmptyComment(),
  ])

  const [isGrid, setIsGrid] = useState(false)

  const [filterBy, setFilterBy] = useState({
    ...commentService.getDefaultFilter(),
    isRandom: true,
  })

  useEffect(() => {
    loadRandomComments()
  }, [])

  async function loadRandomComments() {
    let newDate = new Date()

    let day = String(newDate.getDate()).padStart(2, '0') // Get the day, padded with 0 if necessary
    let month = String(newDate.getMonth() + 1).padStart(2, '0') // Get the month (note: months are 0-indexed)
    let year = newDate.getFullYear() // Get the year

    const date = `${day}-${month}-${year}`

    setFilterBy({ ...filterBy, date: date })
    console.log(filterBy)

    const comments = await loadComments(filterBy)
    setRandomComments(comments)
  }

  return (
    <div
      className={
        isGrid ? 'random-comments-container grid' : 'random-comments-container'
      }
    >
      <div className='controller-container'>
        {/* <CommentFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
        <Button
          variant='contained'
          onClick={() => setIsGrid((prev) => (prev = !prev))}
        >
          {isGrid ? 'List' : 'Grid'}
        </Button>
      </div>
      {randomComments.map((comment) => {
        return (
          <div className='comment-container' key={comment._id}>
            <div className='head-container'>
              <img src={comment.owner.imgUrl} alt='' />
              <div className='title-container'>
                <b>{comment.owner.fullname}</b>
                <span>{comment.dateAdded}</span>
              </div>
            </div>
            <div className='comment-text'>
              <b>{comment.title}</b>
              <p>{comment.txt}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
