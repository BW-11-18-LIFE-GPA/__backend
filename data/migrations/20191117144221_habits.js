
exports.up = function(knex) {
  return knex.schema.createTable('habits', table => {
      table.increments()

      table.string('name', 255).notNullable().unique()
      table.string('description', 255)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('habits')
};
