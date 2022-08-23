const baseURL = `http://localhost:4000/api/hikes`

const hikesContainer = document.querySelector('#hike-cards')

const hikesCallback = ({ data: hikes}) => displayHikes(hikes)
const errCallback = err => console.log(err)

const getAllHikes = () => {
  axios.get(baseURL).then(hikesCallback).catch(errCallback)
}





function createHikeCard(hike) {
  const hikeCard = document.createElement('div')
  hikeCard.classList.add('hike-card')

  hikeCard.innerHTML = `
  <h1>${hike.name}</h1>`

  hikesContainer.appendChild(hikeCard)
}

function displayHikes(arr) {
  hikesContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++) {
      createHikeCard(arr[i])
  }
}

getAllHikes()

