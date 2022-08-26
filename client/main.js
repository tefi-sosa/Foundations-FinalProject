// const baseURL = `http://localhost:4000/api/hikes`

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

  axios.get(`http://localhost:4444/api/hikes`)
      .then(res => {
          res.data.forEach(elem => {
              let hikeCard = `<div class="hike-card feature-box col-md-6 col-lg-4">
              <div class="card-title">
                <h3>${elem.hike_name}</h3>
                <i onclick="addFavorite(${elem.hike_id})" id="${elem.hike_id}" class="fa-regular fa-star"></i>
              </div>
              <img class="hike-img" src="${elem.img_url}" alt="${elem.hike_name} picture">
              <p>Difficulty: ${elem.hike_dificulty}</p>
              <p>Rating: ${elem.hike_rating}</p>
              <p>Location: ${elem.location_name}, ${elem.state}</p>
            </div>
              `

              hikesContainer.innerHTML += hikeCard
          })
      })
}

function addFavorite(id) {
  // console.log(id)
  let idObj = {
    hike_id: id
  }
  axios.post(`http://localhost:4444/api/favorites`, idObj)
      .then(res => {
        console.log("fav added")
      })
}


// function createHikeCard(hike) {
//   const hikeCard = document.createElement('div')
//   hikeCard.classList.add('hike-card')

//   hikeCard.innerHTML = `
//   <h3>${hike.name}</h3>
//   <img class="hike-img" src="${hike.url}" alt="">
//   <p>Difficulty: ${hike.difficulty}</p>
//   <p>Rating: ${hike.rating}</p>
//   <p>Location: ${hike.location}</p>
//   `

//   hikesContainer.appendChild(hikeCard)
// }


// const hikesCallback = ({ data: hikes}) => displayHikes(hikes)
// const errCallback = err => console.log(err)

// const getAllHikes = () => {
//   axios.get(baseURL).then(hikesCallback).catch(errCallback)
// }





// function createHikeCard(hike) {
//   const hikeCard = document.createElement('div')
//   hikeCard.classList.add('hike-card')

//   hikeCard.innerHTML = `
//   <h3>${hike.name}</h3>
//   <img class="hike-img" src="${hike.url}" alt="">
//   <p>Difficulty: ${hike.difficulty}</p>
//   <p>Rating: ${hike.rating}</p>
//   <p>Location: ${hike.location}</p>
//   `

//   hikesContainer.appendChild(hikeCard)
// }

// function displayHikes(arr) {
//   hikesContainer.innerHTML = ``
//   for (let i = 0; i < arr.length; i++) {
//       createHikeCard(arr[i])
//   }
// }

// getAllHikes()

createHikeCard()


