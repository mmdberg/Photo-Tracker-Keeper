

const fetchPhotos = async () => {
  try {
    let response = await fetch('/api/v1/photos')
    let photos = await response.json()
    let photosArray = photos.map(photoInfo => {
      return (`
      <article class="photo">
        <img src="${photoInfo.link}" alt="${photoInfo.title}">
        <p class="photo-title">${photoInfo.title}</p>
      </article>
      `)
    })
    $('.photo-album').append(photosArray)


  } catch (error) {
    console.log(error)
  }
}

fetchPhotos()