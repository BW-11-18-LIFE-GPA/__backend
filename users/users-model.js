const db = require('../data/dbconfig')

const getUserList = () => {
    return db('users').select('username', 'id')
}

const getUserById = id => {
    return db('users').where({ id }).select('username')
}

const getHabitsByUser = user_id =>{
    return db.select('user_habits.id AS id', 'habits.name', 'habits.description','user_habits.score','habits.id AS habit_id')
    .from('habits')
    .join('user_habits', 'habits.id', 'user_habits.habit_id')
    .join('users', 'user_habits.user_id', 'users.id')
    .where({'users.id': user_id})
}

const getHabitById = id => {
    return db.select('user_habits.id AS id', 'habits.name', 'habits.description','user_habits.score','habits.id AS habit_id')
    .from('habits')
    .join('user_habits', 'habits.id', 'user_habits.habit_id')
    .where({'user_habits.id': id})
}

const addUserHabit = async (habit) => {
   const [id] = await db('user_habits')
    .insert(habit)

    return getHabitById(id)
}

const removeUserHabit = async (id, user_id) => {
    await db('user_habits').where({'user_habits.id': id}).delete()

    return getHabitsByUser(user_id)
}

const updateUserHabit = async (id, data) => {
    await db('user_habits').where({'user_habits.id': id}).update(data)

    return getHabitById(id)
}



module.exports = { getHabitsByUser, addUserHabit, getHabitById, removeUserHabit, updateUserHabit, getUserList, getUserById }