const db = require('../data/dbconfig.js');

const fetchAll = async() => {
    const habits = await db('habits')

    return habits
}

const fetchBy = async filter => {
    const habits = await db('habits').where(filter)

    return habits
}

const fetchById = async id => {
    const habit = await db('habits')
    .where({ id })
    .first()

    return habit
}

const addHabit = async habit => {
    const [id] = await db('habits').insert(habit, 'id');
   
    return fetchById(id);
}

const removeHabit =  async id => {
   const habit = await db('habits').delete().where({ id })

   return habit
}

const updateHabit = async (id, data) => {
    await db('habits').where({ id }).update(data)

    return fetchById(id)
}




module.exports = { fetchAll, fetchBy, fetchById, addHabit, removeHabit, updateHabit }