import React, { useEffect } from 'react'
import '../styles/home.css'

export const Home = () => {
  useEffect(() => {

  }, [])
  return (
    <div className='homepage'>
        <h1>Welcome to the Movie and Food Generator</h1>
        <br />
        <h2>Find a random movie of the top 5000 most popular movies in the US</h2>
        <h1>or</h1>
        <h2>Find some Inspiration for your next meal with the food web-page</h2>
        <br />
        <p>You can use this website to look for popular movie selections or find delicious food sugestions. Have a hard time Deciding between lots of movies, thats hwere Movie and Food Generator comes in. you can now use this website to select one of the top 5000 movies in the United States of America or narrow down the selection by adding a genre and time frame. this is helpful if you are looking for a comedy from the 90's or a action from the 80's and everything in between. This website helps you to make selecting a movie much more effecient. I love it/use it and hope you will to!</p>
    </div>
  )
}
