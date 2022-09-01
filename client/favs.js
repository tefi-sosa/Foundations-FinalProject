const favesContainer = document.querySelector('#favorites-hike-cards-container')

function createFavHikeCard() {
  favesContainer.innerHTML = ''

  axios.get(`/api/favorites`)
      .then(res => {
          res.data.forEach(elem => {
              let hikeCard = `  
              <div class="fave-hike-card feature-box col-lg-4">
              <div class="close">
                <a href=""><i onclick="deleteFavorite(${elem.hike_id})" class="fa-solid fa-xmark"></i></a>
              </div>
              <img class="hike-img" src="${elem.img_url}" alt="${elem.hike_name} picture">              
              <div class= "card-title-container" >
              <div class="card-title">
                <p>${elem.location_name}, ${elem.state}</p>                
                <h3>${elem.hike_name}</h3>
              </div></div> 

              <!-- Button trigger modal -->
              <div class="btn-div"><button type="button" class="btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal${elem.hike_id}">
                Select
              </button></div>
              
              <!-- Modal -->
              <div class="modal fade" id="exampleModal${elem.hike_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel"></h5>
                      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <p>Difficulty: ${elem.hike_dificulty}</p>
                      <p>Rating: ${elem.hike_rating}</p>
                      <p>Distance: ${elem.hike_distance} miles</p>
                      <p>Elevation: ${elem.hike_elevation} feet</p>
                    </div>
                    <div class="modal-footer">
                      <a href="${elem.location_map}" target="_blank" ><button type="button" class="" >Get Location</button></a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
              `

              favesContainer.innerHTML += hikeCard
          })
      })
}

function deleteFavorite(id) {
  axios.delete(`/api/favorites/${id}`)
      .then(res => {
        console.log("fav deleted")
        createFavHikeCard()
      })
}



createFavHikeCard()