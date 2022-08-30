import React, { useState, useEffect } from 'react'
import {TextField, Button} from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditNote() {

  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: ''
  })

  const navigate = useNavigate()

  const {idNote} = useParams()
  
  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('tokenStore')
      if (idNote) {
        const res = await axios.get(`/api/notes/${idNote}`, {
          headers: { Authorization: token }
        })
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id
        })
      }
    }
    getNote()
  }, [idNote])

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setNote({...note, [name]:value})
  }

  const editNote = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date, id } = note
        const newNote = {
          title, content, date
        }
        await axios.put(`/api/notes/${id}`, newNote, {
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
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete='off'>
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
