var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav").style.top = "0";
  } else {
    document.getElementById("nav").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

const hikesContainer = document.querySelector('#hike-cards-container')

function createHikeCard() {
  hikesContainer.innerHTML = ''

  axios.get(`/api/hikes`)
      .then(res => {
          res.data.forEach(elem => {
              solidStar(elem.hike_id).then(value => {
              let hikeCard = `<div class="hike-card feature-box col-md-6 col-lg-4">
                <div class="star">
                <a href=""><i onclick="addFavorite(${elem.hike_id})" id="${elem.hike_id}" class="${value}" data-toggle="tooltip" data-placement="top" title="Add to Favorites"></i></a></div>
                <img class="hike-img" src="${elem.img_url}" alt="${elem.hike_name} picture">
                <div class= "card-title-container" >
                <div class="card-title">
                  <p>${elem.location_name}, ${elem.state}</p>                
                  <h3>${elem.hike_name}</h3>
                </div></div>  
                              
                <!-- Button trigger modal -->
                <div class="btn-div"><button type="button" class="btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Select
                </button></div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>Difficulty: ${elem.hike_dificulty}</p>
                        <p>Rating: ${elem.hike_rating}</p>
                        <p>Distance: ${elem.hike_distance} miles</p>
                        <p>Elevation: ${elem.hike_elevation} feet</p>
                      </div>
                      <div class="modal-footer">
                        <a href="${elem.location_map}"><button type="button" class="location-btn" >Get Location</button></a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
              `

              hikesContainer.innerHTML += hikeCard                 
            })

          })
      })
}

function addFavorite(id) {
  // console.log(id)
  const star = document.getElementById(`${id}`)
  star.className = "fa-solid fa-star"

  let idObj = {
    hike_id: id
  }
  axios.post(`/api/favorites`, idObj)
      .then(res => {
        console.log("fav added")
      })
}


async function solidStar(id) {
  console.log(id)

  let favIds = []

  await axios.get(`/api/favoritesId`)
    .then(res => {
      console.log("fav comparsion")
      console.log(res.data)

      res.data.forEach(element => {
        favIds.push(element.hike_id)
      });

    })
      
    console.log(favIds)      
    for (let i = 0; i < favIds.length; i++) {
      console.log(favIds[i])
      if (parseInt(favIds[i]) === parseInt(id)) {
        console.log("works")
        let className = "fa-solid fa-star"
        return className
      }
    }
    console.log("not a favorite")
    let className = "fa-regular fa-star"
    return className
}

createHikeCard()


