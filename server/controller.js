const { hikes } = require('./seed')

module.exports = {
  getAllHikes: (req, res) => {
      console.log("hello");
      res.status(200).send(hikes)
  },

}