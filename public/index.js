

const fetchPhotos = async () => {
  try {
    let response = await fetch('/api/v1/photos')
    let photos = await response.json()
    console.log(photos)
    let photosArray = photos.map(photoInfo => {
      return (`
      <article class="photo" id=${photoInfo.id}>
        <img src="${photoInfo.link}" alt="${photoInfo.title}">
        <p class="photo-title">${photoInfo.title}</p>
      </article>
      `)
    })
    $('.photo-album').append(photosArray)


  } catch (error) {
    console.log('fetchPhotos error: ', error)
  }
}

const appendNewPhoto = (title, link, id) => {
  $('.photo-album').append(`
    <article class="photo" id=${id}>
      <img src="${link}" alt="${title}">
      <p class="photo-title">${title}</p>
    </article>
    `)
}

const addPhoto = async (e) => {
  e.preventDefault()

  try {
    let title = $('.title-input').val()
    let link = $('.link-input').val()
    let response = await fetch('/api/v1/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        link
      })
    })
    let id = await response.json()
    appendNewPhoto(title, link, id.id)
    $('.title-input').val('')
    $('.link-input').val('')
  } catch (error) {
    console.log('addPhoto error: ', error);
  }
}

fetchPhotos()
$('.add-photo-button').click(addPhoto)