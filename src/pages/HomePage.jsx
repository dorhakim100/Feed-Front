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
import { Button } from '@mui/material'

import { RandomComments } from '../cmps/RandomComments.jsx'

export function HomePage() {
  return (
    <section>
      <RandomComments />
    </section>
  )
}
