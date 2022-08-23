const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

const { hikes } = require('./seed')
const{ getAllHikes } = require("./controller")

app.get(`/api/hikes`, getAllHikes);




const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})