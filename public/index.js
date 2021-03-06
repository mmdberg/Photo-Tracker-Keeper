

const fetchPhotos = async () => {
  try {
    let response = await fetch('/api/v1/photos')
    let photos = await response.json()
    let photosArray = photos.map(photoInfo => {
      return (`
      <article class="photo" id=${photoInfo.id}>
        <img src="${photoInfo.link}" alt="${photoInfo.title}">
        <p class="photo-title">${photoInfo.title}</p>
        <button class="delete-button"></button>
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
      <button class="delete-button"></button>
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
    if (id.id) {
      appendNewPhoto(title, link, id.id)
      $('.title-input').val('')
      $('.link-input').val('')
    }
  } catch (error) {
    console.log('addPhoto error: ', error);
  }
}

const deletePhoto = async (event) => {
  if($(event.target).hasClass('delete-button')) {
    let photoToRemove = ($(event.target).parent())
    let idToRemove = $(photoToRemove).attr('id')
    try {
      fetch(`/api/v1/photos/${idToRemove}`, {
        method: 'DELETE'
      })
      $(photoToRemove).remove()
    } catch (error) {
      console.log('deletePhoto error: ', error);
    }
  }
}

fetchPhotos()
$('.add-photo-button').click(addPhoto)
$(this).click(deletePhoto)