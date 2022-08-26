const favesContainer = document.querySelector('#favorites-hike-cards-container')

function createFavHikeCard() {
  favesContainer.innerHTML = ''

  axios.get(`http://localhost:4444/api/favorites`)
      .then(res => {
          res.data.forEach(elem => {
              let hikeCard = `  <div class="fave-hike-card feature-box col-lg-4">
              <div class="card-title">
                <h3>${elem.hike_name}</h3>
                <i onclick="deleteFavorite(${elem.hike_id})" class="fa-solid fa-xmark"></i>
              </div>
              <img class="hike-img" src="${elem.img_url}" alt="${elem.hike_name} picture">
              <p>Difficulty: ${elem.hike_dificulty}</p>
              <p>Rating: ${elem.hike_rating}</p>
              <p>Location: ${elem.location_name}, ${elem.state}</p>
            </div>
              `

              favesContainer.innerHTML += hikeCard
          })
      })
}

function deleteFavorite(id) {
  // console.log(id)
  // let idObj = {
  //   hike_id: id
  // }
  // console.log(idObj)
  axios.delete(`http://localhost:4444/api/favorites/${id}`)
      .then(res => {
        console.log("fav deleted")
        createFavHikeCard()
      })
}

createFavHikeCard()