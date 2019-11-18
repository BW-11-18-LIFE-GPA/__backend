
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_habits').del().truncate()
  .then(function () {
    return knex('users').del().truncate()
  })
  .then(function () {
    return knex('habits').del().truncate()
  })
  .then(function () {
      // Inserts seed entries
      return knex('user_habits').insert([
        {id: 1, user_id: 1, habit_id: 1, score: 10},
      ]);
    })
  .then(function () {
    return knex('habits').insert([
      {id: 2, name: 'Seed Habit', description: 'This habit placed initially so the table would not be empty'}
    ])
  })
  .then(function () {
    return knex('users').insert([
      {id: 1, username: 'robert', email: 'robert@gmail.com', password: 'carter'},
      {id:2, username: 'test', email: 'test@gmail.com', password: 'test'}
    ])
  })
};
