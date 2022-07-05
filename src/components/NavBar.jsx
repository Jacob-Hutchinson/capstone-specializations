import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import '../styles/navbar.css'

export const NavBar = (props) => {
    const {setRoute, userID} = props
    const handleClick = (str) => {
      console.log(str)
      setRoute(str.target.id)
    }
  return (
    <div className='bar'>
        <Link to={'/'} className='bar-button'>
            <Button variant="outlined" color="primary" onClick={handleClick} id='Home'>
              Home
            </Button>
        </Link>
        <Link to={'/movie'} className='bar-button'>
            <Button variant="outlined" color="primary" onClick={handleClick} id='Movies'>
              Movies
            </Button>
        </Link>
        <Link to={'/food'} className='bar-button'>
            <Button variant="outlined" color="primary" onClick={handleClick} id='Food'>
              Food
            </Button>
        </Link>
        <Link to={'/list'} className='bar-button'>
           {userID && <Button variant="outlined" color="primary" onClick={handleClick} id="List">
              Watch-List
            </Button>}
        </Link>
    </div>
  )
}
