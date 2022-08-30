import React from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'

export default function Register(props) {
  const {
    setUser,
    setErr,
    onChangeInput,
    err,
    user,
    setOnLogin
  } = props

  const registerSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/register', {
        username: user.name,
        email: user.email,
        password: user.password
      })
      setUser({ 
      name: '', 
      email: '', 
      password: ''})
      setErr(res.data.msg)
    } catch (err) {
        err.response.data.msg && setErr(err.response.data.msg)
    }
  }

  return (
    <section className='register-page'>
      <div className='register create-note'>
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <TextField
            required
            type='text'
            label='Username'
            id='register-name'
            name='name'
            variant='outlined'
            value={user.name}
            onChange={onChangeInput}
            className='inputField'
          />
          <TextField
            required
            type='email'
            label='Email'
            id='register-email'
            name='email'
            variant='outlined'
            value={user.email}
            onChange={onChangeInput}
            className='inputField'
          />
          <TextField
            required
            id="register-password"
            name='password'
            label="Password"
            type="password"
            value={user.password}
            autoComplete='true'
            onChange={onChangeInput}
            className='inputField'
          />
          <Button 
          variant='contained'
          type='submit'
          className='saveButton'>
            Register
          </Button>
          <p>Already have an account?
            <span onClick={() => { setOnLogin(true) }}> Login Now</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  )
}
