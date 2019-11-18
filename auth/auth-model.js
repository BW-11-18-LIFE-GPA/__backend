const db = require('../data/dbconfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
   await db('users').insert(user);
  return findBy(user.username);
}

function findById(id) {
  return db('users')
    .where({'users.id': id})
    .first();
}