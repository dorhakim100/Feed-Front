import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { CommentIndex } from './pages/CommentIndex.jsx'

import { CommentDetails } from './pages/CommentDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

export function RootCmp() {
  return (
    <div className='main-container'>
      <AppHeader />
      <UserMsg />

      <main>
        <Routes>
          <Route path='' element={<HomePage />} />

          <Route path='comment' element={<CommentIndex />} />
          <Route path='comment/:commentId' element={<CommentDetails />} />
          <Route path='user/:id' element={<UserDetails />} />
          <Route path='login' element={<LoginSignup />}>
            <Route index element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
