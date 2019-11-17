const db = require('../data/dbConfig.js');

const fetchAll = () => {
    return db('habits')
}

const fetchBy = filter => {
    return db('habits').where(filter)
}

const fetchById = id => {
    return db('habits')
    .where({ id })
    .first()
}

const addHabit = async habit => {
    const [id] = await db('habits').insert(habit);
   
    return fetchById(id);
}

const removeHabit =  id => {
    return db('habits').delete().where({ id })
}

const updateHabit = async (id, data) => {
    await db('habits').where({ id }).update(data)

    return fetchById(id)
}




module.exports = { fetchAll, fetchBy, fetchById, addHabit, removeHabit, updateHabit }