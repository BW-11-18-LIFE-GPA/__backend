const db = require('../data/dbconfig')

const getUserList = async() => {
    const users = await db('users').select('username', 'id')

    return users
}

const getUserById = async id => {
    const user = await db('users').where({ id }).select('username')

    return user
}

const getHabitsByUser = async user_id =>{
    const habits = await db.select('user_habits.id AS id', 'habits.name', 'habits.description','user_habits.score','habits.id AS habit_id')
    .from('habits')
    .join('user_habits', 'habits.id', 'user_habits.habit_id')
    .join('users', 'user_habits.user_id', 'users.id')
    .where({'users.id': user_id})

    return habits
}

const getHabitById = async id => {
    const habit = await db.select('user_habits.id AS id', 'habits.name', 'habits.description','user_habits.score','habits.id AS habit_id')
    .from('habits')
    .join('user_habits', 'habits.id', 'user_habits.habit_id')
    .where({'user_habits.id': id})

    return habit
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