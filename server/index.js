require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const {SERVER_PORT} = process.env
const {seed} = require('./controllers/seed')


app.use(express.json())
app.use(cors())

const {
    login,
    register,
    favorite,
    favoriteSkin,
    getFavorite,
    getfavoriteSkin, 
    deleteFavorite,
    deleteFavoriteSkin

} = require('./controllers/controller.js')

app.post('/seed', seed)

app.post(`/api/login`, login)

app.post(`/api/register`, register)

app.post(`/api/favorite`, favorite)

app.post(`/api/favoriteSkin`, favoriteSkin)

app.get('/api/favorite', getFavorite)

app.get(`/api/favoriteskin`, getfavoriteSkin)

app.delete('/api/favorite/:name', deleteFavorite)

app.delete('/api/favoriteskin/:name', deleteFavoriteSkin)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))