import React from 'react'
import '../styles/movie.css'

export const MovieCard = ({movie}) => {
  
  return (
    <div className='movieCard'>
        <div className='image'>
        {movie && <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt='movie poster'/>}
        </div>
        <div className='movieDescription'>
            <div className='title'>
        {movie && <h1>Title: <br />{movie.title}</h1>}
        {movie && <h4>{movie.tagline}</h4>}
            </div>
        <div className='description'>
        {movie && <h2>Release-Date: {movie.release_date.split('-').reverse().join('/')}</h2>}
        {movie && <h2>Rated: {movie.vote_average}/10</h2>}
        {movie && <h2>Time: {Math.floor(movie.runtime / 60)} {Math.floor(movie.runtime / 60) === 1 || Math.floor(movie.runtime / 60) === 0  ? 'Hour' : 'Hours'}:{movie.runtime % 60} Minutes </h2>}
        {movie && <h2>Description: <br />{movie.overview}</h2>}
        {movie ? movie.budget ? <h3>budget: {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(movie.budget)}</h3> : <></> : <></>}
        {movie ? movie.revenue ? <h3>Revenue: {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(movie.revenue)}</h3> : <></> : <></>}
        </div>
        </div>
    </div>
  )
}
