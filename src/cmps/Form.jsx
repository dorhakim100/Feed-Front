import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { Button } from '@mui/material'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addComment } from '../store/actions/comment.actions'

export function Form() {
  const user = useSelector((stateSelector) => stateSelector.userModule.user)
  async function onSubmit(values) {
    if (!user) {
      showErrorMsg('Login first')
      return
    }
    const { email, title, text } = values
    const comment = {
      email,
      title,
      text,
      owner: { id: user._id, fullname: user.fullname, imgUrl: user.imgUrl },
    }
    // console.log(comment)
    try {
      const savedComment = await addComment(comment)
      console.log(savedComment)
      showSuccessMsg('Comment added')
    } catch (err) {
      console.log(err)
      showErrorMsg(`Couldn't add comment`)
    }
  }
  return (
    <Formik
      initialValues={{ email: '', password: '', title: '', text: '' }}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        if (!values.title) {
          errors.title = 'Required'
        } else if (values.title.length < 2) {
          errors.title = 'Invalid title'
        }
        if (!values.text) {
          errors.text = 'Required'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
        onSubmit(values)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='input-container email'>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder='Email'
            />
            <span>{errors.email && touched.email && errors.email}</span>
          </div>
          <div className='input-container title'>
            <input
              type='title'
              name='title'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              placeholder='Title'
            />
            <span>{errors.title && touched.title && errors.title}</span>
          </div>
          <div className='input-container password'>
            {/* <label htmlFor='password'>Password</label> */}
            {/* <input
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            /> */}
            {/* {errors.password && touched.password && errors.password} */}
            <textarea
              name='text'
              type='text'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
              id=''
              cols='40'
              rows='10'
            ></textarea>

            <span>{errors.text && touched.text && errors.text}</span>
          </div>
          <Button variant='contained' type='submit' disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  )
}
