
exports.up = function(knex) {
  return knex.schema.createTable('user_habits', table =>{
      table.increments()

      table.integer('user_id').references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE')
      table.integer('habit_id').references('id').inTable('habits').onDelete('RESTRICT').onUpdate('CASCADE')

      table.integer('score').notNullable()
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('user_habits')
};
