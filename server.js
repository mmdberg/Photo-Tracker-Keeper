const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Photo Tracker Keeper';

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
    .then((photos) => {
      response.status(200).json(photos);
    })
    .catch((error) => {
      response.status(500).json({error})
    })
})

app.post('/api/v1/photos', (request, response) => {
  let newPhoto = request.body
  console.log(newPhoto)

  for (let requiredParameter of ['title', 'link']) {
    if(!newPhoto[requiredParameter]) {
      return response.status(422).send({error: `You are missing a ${requiredParameter}`})
    }
  }

  database('photos').insert(newPhoto, 'id')
    .then(photo => {

      return response.status(201).json({id: photo[0]})
    })
    .catch(error => {
      return response.status(500).json({error})
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})