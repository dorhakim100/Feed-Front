import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { Formik } from 'formik'
import { Button } from '@mui/material'

export function Form() {
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
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
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
