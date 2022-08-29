require('dotenv').config()
const path = require('path')
const Sequelize = require('sequelize')
const {DATABASE_URL} = process.env

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const { hikes } = require('./seed')


module.exports = {
  // getAllHikes: (req, res) => {
  //     console.log("hello");
  //     res.status(200).send(hikes)
  // },
  getHTML: (req, res) => {
    res.sendFile(path.join(__dirname, "../client/home.html"))
  },
  getCSS: (req, res) => {
    res.sendFile(path.join(__dirname, "../client/style.css"))
  },
  getFavs: (req, res) => {
    res.sendFile(path.join(__dirname, "../client/favorites.html"))
  },
  getDiscover: (req, res) => {
    res.sendFile(path.join(__dirname, "../client/discover.html"))
  },

  getAllHikes: (req, res) => {
    console.log("hello");
    sequelize.query(`select * from hikes h
        join location l on l.location_id = h.location_id
        `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err))
  },

  postFavHike: (req, res) => {
    console.log("posting");
    let {
      hike_id
    } = req.body
    console.log(req.body)

    sequelize.query(`insert into favorites (hike_id)
    values ('${hike_id}')
    returning *`)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err))
  },

  getFavHikes: (req, res) => {
    console.log("getting favorites");
    sequelize.query(`select f.hike_id, hike_name, hike_dificulty, img_url, hike_distance, hike_elevation, hike_rating, location_id, location_map
        from favorites f
        join hikes h on h.hike_id = f.hike_id
        `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err))
  },

  deleteFavHike: (req, res) => {
    console.log("deleting");
    console.log(req.params.id)
    let { id: hike_id } = req.params

    sequelize.query(`DELETE FROM favorites WHERE hike_id = '${hike_id}'
    returning *`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
  },

  getFavHikesId: (req, res) => {
    console.log("comparing with favorites");
    sequelize.query(`select hike_id
        from favorites
        `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err))
  },
}