const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../build')))

const {getPopMovie, genreMovie, getFood, deleteMovie, addUser, checkUser, addMovie2, displayList2, categoryFood, countryFood} = require('./controller')

app.get('/movie', getPopMovie)
app.post('/movie', genreMovie)
app.get('/food', getFood)
app.post('/food', categoryFood)
app.post('/food2', countryFood)
app.post('/list', addMovie2)
app.post('/displayList', displayList2)
app.delete('/list/:id', deleteMovie)
app.post('/signin', addUser)
app.post('/login', checkUser)


const PORT = process.env.PORT  || 4005 

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))