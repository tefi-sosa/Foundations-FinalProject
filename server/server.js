require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())


const { seed } = require('./seed')
app.post('/seed', seed);

const{ getAllHikes } = require("./controller")

app.get(`/api/hikes`, getAllHikes);




const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})