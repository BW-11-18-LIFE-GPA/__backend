
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('habits').del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('habits').insert([
        {id: 1, name: 'Seed Habit', description: 'This habit placed initially so the table would not be empty'}
      ]);
    });
};
