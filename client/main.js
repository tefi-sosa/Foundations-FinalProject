const baseURL = `http://localhost:3000/api/hikes`

const hikesContainer = document.querySelector('#hike-cards')

const getAllHikes = () => {
  axios.get(baseURL).then(({ data: hikes }) => 
    displayHikes(hikes)

  ).catch(console.log(err))
}




function createHikeCard(house) {
  const hikeCard = document.createElement('div')
  hikeCard.classList.add('hike-card')

  hikeCard.innerHTML = `
  <img alt='house cover image' src=${house.imageURL} class="house-cover-image"/>
  <p class="address">${house.address}</p>
  <div class="btns-container">
      <button onclick="updateHouse(${house.id}, 'minus')">-</button>
      <p class="house-price">$${house.price}</p>
      <button onclick="updateHouse(${house.id}, 'plus')">+</button>
  </div>
  <button onclick="deleteHouse(${house.id})">delete</button>
  `


  hikesContainer.appendChild(hikeCard)
}

function displayHikes(arr) {
  hikesContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++) {
      createHikeCard(arr[i])
  }
}

getAllHikes()

