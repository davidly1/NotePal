import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateNote() {

  const [note, setNote] = useState({
    title: '',
    content: '',
    date: ''
  })

  const navigate = useNavigate()

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setNote({...note, [name]:value})
  }

  const createNote = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date } = note
        const newNote = {
          title, content, date
        }
        await axios.post('/api/notes', newNote, {
          headers: { Authorization: token }
        })
        return navigate.push('/')
      }
    } catch (err) {
        window.location.href = '/'
    }
  }

  return (
    <div className='create-note'>
      <h2>Create Note</h2>
      <form onSubmit={createNote} autoComplete='off'>
        <div className='row'>
          <TextField 
            type='text'
            value={note.title}
            id='title'
            name='title'
            required
            label='title'
            onChange={onChangeInput}
            className='inputField'
          />
        </div>
        <div className='row'>
          <TextField
          type='text'
          value={note.content}
          label='content'
          multiline
          id='content'
          name='content'
          required
          rows='10'
          onChange={onChangeInput}
          className='inputField'
          />
        </div>

        <label htmlFor='date'>Date: {note.date} </label>
        <div className='row'>
          <TextField
          color='secondary'
          type='date'
          name='date'
          id='date'
          onChange={onChangeInput}
          className='inputField'
          />
        </div>

        <Button 
        type='submit'
        variant='contained'
        className='saveButton'
        >
          Save
          </Button>
      </form>
    </div>
  )
}
