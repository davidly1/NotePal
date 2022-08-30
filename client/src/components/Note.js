import React from 'react'
import Header from './notes/Nav'
import Home from './notes/Home'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function Note({ setIsLogin }) {
  return (
    <BrowserRouter>
      <div className='note-page'>
        <Header setIsLogin={setIsLogin}/>
        <section>
          <Routes>
            <Route path='/' element={<Home/>} exact />
            <Route path='/create' element={<CreateNote/>} exact />
            <Route path='/edit/:idNote' element={<EditNote/>} exact />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  )
}
