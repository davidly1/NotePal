import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Note from './components/Note'

function App() {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    // Checks if token is still active, auto logs you in if token is active
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers: { Authorization: token }
        })
        console.log(verified)
        setIsLogin(verified.data)
        if (verified.data === false) return localStorage.clear()
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="App">
      { 
        isLogin 
        ? <Note setIsLogin={setIsLogin} /> 
        : <Login setIsLogin={setIsLogin} /> 
      }
    </div>
  );
}

export default App;
