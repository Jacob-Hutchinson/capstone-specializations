import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/movie.css'
import { MovieCard } from './MovieCard'
import Button from '@mui/material/Button'
import { Providers } from './Providers'
import FormControl from '@mui/material/FormControl'
import { InputLabel, Select, MenuItem } from '@mui/material'
// for date picker


export const Movie = (props) => {
  const [movie, setMovie] = useState()
  const [genre, setGenre] = useState('')
  const [date, setDate] = useState('')
  const [date1, setDate1] = useState('')
  const {route, setRoute, userID} = props

  useEffect(() => {
    setRoute('Movies')
  }, [route])

  const getmovie = (e) => {
    e.preventDefault()
    axios.get('http://localhost:4004/movie')
    .then(res => {
      setMovie(res.data)
    })
  } 
  const handleForm = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4004/movie', {genre: genre, date: date, date1: date1})
    .then(res => {
      if(res.data.title){
        setMovie(res.data)
      }
    else{
      alert('no movie was found. Please try again or change the search Parameters')
    }
    })
    
  }
  const handleGenre = (e) => {
    setGenre(e.target.value)
  }
  const handledate = (e) => {
    setDate(e.target.value)

  }
  const handledate1 = (e) => {
    setDate1(e.target.value)
  }
  const addList = e => {
    e.preventDefault()
    axios.post('http://localhost:4004/list', {id: movie.id, title: movie.title, image: movie.poster_path, UserID: userID})
    .then(res => {
      console.log(res)
      if(res.data === 'tooManyMovies'){
        alert('Too many movies in your list. Remove some movies from your list to add more.')
      }
    })
  }

  return (
    <div className='movie-div'>
      <br />
      <div className='form'>
      <Button variant="contained" color="primary" size='small' onClick={getmovie}>
        Get Random Movie
      </Button> 
      <h2>OR</h2>
      <br />
      <div className='genre'>
      <form className="selector" onSubmit={handleForm}>
        {/* <select name="genre" id="genre" onChange={handleGenre} style={{width: "125px"}} required>
        <option value=""></option>
          <option value="28">action</option>
          <option value="35">Comedy</option>
          <option value="12">Adventure</option>
          <option value="18">Drama</option>
          <option value="14">Fantasy</option>
          <option value="878">Sci-Fi</option>
          <option value="53">Thriller</option>
        </select> */}
        <FormControl>
          <InputLabel id=''>Genre</InputLabel>
          <Select
          value={genre}
          label="genre"
          onChange={handleGenre}
          required
          sx={{width: "125px", height: "40px", margin: "10px"}}
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='28'>Action</MenuItem>
            <MenuItem value="35">Comedy</MenuItem>
            <MenuItem value="12">Adventure</MenuItem>
            <MenuItem value="18">Drama</MenuItem>
            <MenuItem value="14">fantasy</MenuItem>
            <MenuItem value="878">Sci-Fi</MenuItem>
            <MenuItem value="53">Thriller</MenuItem>
          </Select>
        </FormControl>
        <label htmlFor="date">From</label>
        <input type="date" id='date' onChange={handledate}/>
        
        <label htmlFor="date1">To</label>
        <input type="date" id='date' onChange={handledate1}/>

      <Button variant="contained" color="primary" size='small' className='getButton' type='submit'>
        Generate Movie
      </Button>
      </form>
      </div>
      </div>
      <br />
      <MovieCard movie={movie} />
      {movie ? userID ?
      <Button variant="contained" color="primary" onClick={addList}>
        Add to List
      </Button> : <></> : <></>}
      {movie ? movie.results.US ?
      <Providers movie={movie}/> : <></> : <></>}
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
