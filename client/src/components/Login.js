import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import Register from './Register'

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [err, setErr] = useState('')

  const [onLogin, setOnLogin] = useState(true)

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErr('')
  }

  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', {
        email: user.email,
        password: user.password
      })
      setUser({
        name: '',
        email: '',
        password: ''
      })
      localStorage.setItem('tokenStore', res.data.token)
      setIsLogin(true)
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg)
    }
  }

  return (
    <>
      {onLogin ?
        <section className='login-page'>
          <div className='login create-note'>
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
              <TextField
                required
                type='email'
                label='Email'
                id='login-email'
                name='email'
                variant='outlined'
                value={user.email}
                onChange={onChangeInput}
                className='inputField'
              />
              <TextField
                required
                id="login-password"
                name='password'
                variant='outlined'
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
                Login
              </Button>
              <p>Don't have an account?
                <span onClick={() => { setOnLogin(false) }}> Register Now</span>
              </p>
              <h3>{err}</h3>
            </form>
          </div>
        </section>
        :
        <Register
          setUser={setUser}
          setErr={setErr}
          onChangeInput={onChangeInput}
          err={err}
          user={user}
          setOnLogin={setOnLogin}
        />
      }
    </>
  )
}
