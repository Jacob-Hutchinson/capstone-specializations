import React from 'react'
import '../styles/providers.css'

export const Providers = ({movie}) => {
  let provider
  let buy
  let rent 
  let free
  let Bcounter = 0
  let Fcounter = 0
  let Rcounter = 0
  let FREEcounter = 0
      if (movie.results.US.flatrate) {
        provider = movie.results.US.flatrate.map(el => {
          Fcounter ++
          return <h4>{Fcounter}:{el.provider_name}</h4>
        })
      }
      if (movie.results.US.buy) {
        buy = movie.results.US.buy.map(el => {
          Bcounter++
          return <h4>{Bcounter}:{el.provider_name}</h4>
        })
      }
      if (movie.results.US.rent) {
        rent = movie.results.US.rent.map(el => {
          Rcounter++
          return <h4>{Rcounter}:{el.provider_name}</h4>
        })
      }
      if (movie.results.US.free) {
        free = movie.results.US.free.map(el => {
          FREEcounter++
          return <h4>{FREEcounter}:{el.provider_name}</h4>
        })
      }
  console.log(movie)
  return (
    <div style={{display: "flex"}}>
      {provider &&
      <div className='streaming'>
        <h2>Streaming providers:</h2>
        {provider}
        </div>}
        {buy &&
        <div className='streaming'>
          <h2>Buy:</h2>
          {buy}
        </div>}
        {rent &&
        <div className='streaming'>
          <h2>Rent:</h2>
          {rent}
        </div>}
        {free &&
        <div className='streaming'>
          <h2>Free:</h2>
          {free}
        </div>}
    </div>
  )
}
