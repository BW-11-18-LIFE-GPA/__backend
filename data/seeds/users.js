
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'robert', email: 'robert@gmail.com', password: 'carter'},
        {id:2, username: 'test', email: 'test@gmail.com', password: 'test'}
      ]);
    });
};
