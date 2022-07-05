import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Food } from './components/Food';
import { Home } from './components/Home';
import { List } from './components/List';
import { SignIn} from './components/SignIn';
import { Movie } from './components/Movie';
import { NavBar } from './components/NavBar';
import Button from '@mui/material/Button'
import { Login } from './components/Login';



function App() {
  const [login, setLogin] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [user, setUser] = useState()
  const [userID, setUserID] = useState()
  const [route, setRoute] = useState('home')
  const handleLogin = () => {
    setLogin(true)
  }
  const handleSign = () => {
    setSignIn(true)
  }
  console.log(userID)
  return (
    <div className={`${route} App`} >
      <div className='login'>
        {user && <div style={{display:"flex"}}>
        <h3 style={{marginRight: "25px", color: 'white'}}>Welcome {user.toUpperCase()}!</h3>
        <div>
          <Link to={'/'}>
        <Button variant="contained" color="primary"  onClick={() => {setUser(); setUserID()}}>
          Sign-out
        </Button></Link></div></div>}
        {!user && <div>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      <Button variant="contained" color="primary" onClick={handleSign}>
        Sign-up
      </Button></div>}
      <br/>
      </div>
      <div id='login-form'>
      {login && <Login setLogin={setLogin} setUser={setUser} setUserID={setUserID}/>}
      {signIn && !login && <SignIn setSignIn={setSignIn} setUser={setUser}/>}
      </div>
      <h1 className='navbar'>Movie/Food Generator</h1>
      <NavBar setRoute={setRoute} userID={userID} className="navbar"/>
      <Routes>
        <Route path='/' element={<Home setRoute={setRoute} route={route}/>} />
        <Route path='/movie' element={<Movie setRoute={setRoute} route={route} userID={userID}/>} />
        <Route path='/food' element={<Food setRoute={setRoute} route={route}/>} />
        <Route path='/list' element={<List setRoute={setRoute} route={route} userID={userID}/>} />
      </Routes>
    </div>
  );
}

export default App;
