exports.seed = function(knex, Promise) {
  return knex('photos').del()
    .then(function () {
      return Promise.all([
        knex('photos').insert({link: 'https://i.imgur.com/MA2D0.jpg', title: 'Rainbow Dog'}, 'id'),
        knex('photos').insert({link: 'https://i.imgur.com/fSgnUKW.jpg', title: 'Snow Dogs'}, 'id')
      ])
    });
};
