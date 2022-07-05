import axios from 'axios'
import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


export const Login = ({setLogin, setUser, setUserID}) => {

    const handleForm = e => {
        e.preventDefault()
        // console.log(e.target[0].value) this is the value of the first input element from the form
        axios.post('http://localhost:4004/login', {user: e.target[0].value, password: e.target[2].value})
        .then(res => {
            console.log(res.data)
            setLogin(false)
            // is removing the login for after a submit
            if(res.data){
                setUser(res.data[0].user_name)
                setUserID(res.data[0].id)
            }else{
                alert('User does not exist, please try again or sign up!')
            }
            
        })

    }

  return (
    <div>
        <form action="" typeof='submit' onSubmit={handleForm}>
            <TextField
              id="name"
              label="User Name"
              size='small'
              />
            <TextField
              id="pass"
              label="Password"
              type='password'
              size='small'
              />
              <Button variant="contained" color="primary" type='submit' value='submit'>
                Login
              </Button>
            {/* <input type="text" id='name' placeholder='username'/> */}
            {/* <input type="password" id='pass' placeholder='password'/> */}
            {/* <input type="submit" value="Submit" /> */}
        </form>
    </div>
  )
}
