
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      return Promise.all([
        knex('photos').insert({link: 'https://i.imgur.com/MA2D0.jpg', title: 'Rainbow Dog'}, 'id'),
        knex('photos').insert({link: 'https://www.pexels.com/photo/black-and-brown-short-haired-puppy-in-cup-39317/', title: 'Puppy in a Mug'}, 'id')
      ])
    });
};
