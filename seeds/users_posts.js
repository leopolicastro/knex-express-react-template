// import seed data files, arrays of objects
const postData = require('../seed_data/posts');
const userData = require('../seed_data/users');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert(userData);
    })
    .then(() => {
      return knex('posts').del();
    })
    .then(() => {
      return knex('posts').insert(postData);
    });
};
