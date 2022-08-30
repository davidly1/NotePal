import React from 'react'
import { Link } from 'react-router-dom'
import { SvgIcon } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'
import AddCircleIcon from '@mui/icons-material/AddCircle'

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Nav({ setIsLogin }) {

  const logoutSubmit = () => {
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <div className='header'>
      <div className='logo'>
        <h1><Link to='/'>NotePal</Link></h1>
      </div>
      <ul>
        <li><Link to='/'>
          <HomeIcon />
        </Link></li>
        <li><Link to='/create'>
          <AddCircleIcon />
        </Link></li>
        <li onClick={logoutSubmit}><Link to='/'>
          <LogoutIcon />
        </Link></li>
      </ul>
    </div>
  )
}
