import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import '../styles/list.css'

export const List = ({userID}) => {
  const [movieObj, setMovieObj] = useState()
  let [load, setLoad] = useState(0)

  useEffect(() => {
    axios.post(`/displayList`, {userID: userID})
    .then(res => {
      // console.log(res)
      setMovieObj(res.data)
    })
  }, [load])

  const deleteMovie = (e) => {
    axios.delete(`/list/${e.target.value}`)
    .then(res => {
      setLoad(load += 1)
    })
  }
  return (
    <div className='pcard'>
       {movieObj && movieObj.map(el => {
        return <div className="card">
        <div className="img">
        <img id='image'
      src={`https://image.tmdb.org/t/p/w500${el.image}`}
      alt='movie poster'/>
        </div>
        <div className="title">
          <h2>{el.title.replace('~', "'")}</h2>
            </div>
      <Button variant="contained" color="primary" size='small' value={el.id} onClick={deleteMovie}>
        remove from list
      </Button>
      </div>
       })}
    </div>
  )
}
