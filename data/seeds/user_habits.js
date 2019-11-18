
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_habits').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_habits').insert([
        {id: 1, user_id: 1, habit_id: 1, score: 10},
      ]);
    });
};
