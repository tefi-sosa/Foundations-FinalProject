require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('client'))

const{ getAllHikes, postFavHike, getFavHikes, getHTML, getDiscover, getFavs, getCSS, deleteFavHike } = require("./controller")

/////
app.get(`/`, getHTML);
app.get(`/style`, getCSS);
app.get(`/discover`, getDiscover);
app.get(`/favorites`, getFavs);

/// SEED ///
const { seed } = require('./seed')
app.post('/seed', seed);

////


app.get(`/api/hikes`, getAllHikes);
app.post(`/api/favorites`, postFavHike);

app.get(`/api/favorites`, getFavHikes);
app.delete(`/api/favorites/:id`, deleteFavHike);




const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})