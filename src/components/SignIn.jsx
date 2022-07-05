import axios from 'axios'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'



// login is 
export const SignIn = ({setSignIn, setUser}) => {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  // sets the password to add to the axios post 
  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }
  // sets userName use state to add to the axios post
  const handleUserName = (e) => {
    e.preventDefault()
    setUserName(e.target.value)
  }
  // send the username and password to the backend to be added to the sql data base
const handleForm = (e) => {
  e.preventDefault()
  console.log(userName, password)
axios.post('http://localhost:4004/signin', {userName: userName, password: password})
.then(res => {
  // this removes the sign-in form from the page
  setSignIn(false)
  // checks to see if there is a response from the data base and if so then set the user name to a usestate and alert that user has been added
  if(res.data[0].user_name){
  console.log(res, 'res data', res.data)
  alert('user ' + res.data[0].user_name + ' has been added!    NOW PLEASE LOG IN')
  }else {alert('please try again')}
})
}
  return (
    <div>
        <form action="" typeof='submit' onSubmit={handleForm}>
            {/* <input type="text" placeholder='user name' onChange={handleUserName}/> */}
            <TextField
              id=""
              label="User Name"
              onChange={handleUserName}
              size='small'
            />
            {/* <input type="password" placeholder='password' onChange={handlePassword}/> */}
            <TextField
              id=""
              label="Password"
              type='password'
              onChange={handlePassword}
              size='small'
            />
            {/* <input type="submit" value="Submit" /> */}
            <Button variant="contained" color="primary" value="submit" type='submit'>
              Submit
            </Button>
        </form>
    </div>
  )
}
