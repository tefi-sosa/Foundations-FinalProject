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

  axios.get(`/api/hikes`)
      .then(res => {
          res.data.forEach(elem => {
              solidStar(elem.hike_id).then(value => {
              let hikeCard = `<div class="hike-card feature-box col-md-6 col-lg-4">
              <div class="card-title">
                <h3>${elem.hike_name}</h3>
                <i onclick="addFavorite(${elem.hike_id}); solidStar(${elem.hike_id})" id="${elem.hike_id}" class="${value}" data-toggle="tooltip" data-placement="top" title="Add to Favorites"></i>
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
      })
}

function addFavorite(id) {
  // console.log(id)
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
  // const star = document.getElementById(`${id}`)
  // star.className = "fa-solid fa-star"
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
console.log(solidStar(4))

// function normalStar () {
//   axios.get(`http://localhost:4444/api/favorites`)
//     .then(res => { 
//       res.data.forEach(elem => {
//         if ()
//       })})
// }



// star.addEventListener("click", solidStar)

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

// export { solidStar }




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


