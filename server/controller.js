const { hikes } = require('./seed')

module.exports = {
  getAllHikes: (req, res) => {
      console.log("hello");
      res.status(200).send(hikes)
  },

  // createHouse: (req, res) => {
  //     let { name, price, imageURL } = req.body
  //     let newHouse = {
  //         id: globalId,
  //         address, 
  //         price,
  //         imageURL
  //     }
  //     HOUSES.push(newHouse)
  //     res.status(200).send(HOUSES)
  //     globalId++
  // },

}