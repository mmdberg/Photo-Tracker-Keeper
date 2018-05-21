exports.seed = function(knex, Promise) {
  return knex('photos').del()
    .then(function () {
      return Promise.all([
        knex('photos').insert({id: 1, link: 'https://i.imgur.com/MA2D0.jpg', title: 'Rainbow Dog'}),
        knex('photos').insert({id: 2, link: 'https://i.imgur.com/fSgnUKW.jpg', title: 'Snow Dogs'})
      ])
    });
};