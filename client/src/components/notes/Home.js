import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TimeAgo from 'timeago-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function Home() {
  const [notes, setNotes] = useState([])
  const [token, setToken] = useState('')

  const getNotes = async (token) => {
    const res = await axios.get('api/notes', {
      headers: { Authorization: token }
    })
    setNotes(res.data)
  }

  useEffect(() => {
    const token = localStorage.getItem('tokenStore')
    setToken(token)
    if (token) {
      getNotes(token)
    }
  }, [])

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token }
        })
        getNotes(token)
      }
    } catch (err) {
      window.location.href = '/'
    }
  }

  return (
    <div className='note-wrapper'>
      {
        notes.map(note => (
          <div className='card' key={note._id}>
            <h4 title={note.title}>{note.title}</h4>
            <div className='text-wrapper'>
              <p>
                {note.content}
              </p>
            </div>
            <p className='date'>
              <TimeAgo datetime={note.date} />
            </p>
            <div className='note-footer'>
            {note.name}
            <div className='icons'>
              <Link to={`edit/${note._id}`}>
                <EditIcon />
              </Link>
              <DeleteIcon
                className='delete-icon'
                onClick={() => deleteNote(note._id)} />
                </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
