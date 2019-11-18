const router = require('express').Router()
const userHabits = require('./users-model')
const requiresAuth = require('../auth/authMiddleware')

router.get('/', (req, res) => {
    userHabits.getUserList()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem retrieving the list of users"})
    })
})

router.get('/:id', (req, res) => {
    userHabits.getUserById(req.params.id)
    .then(user => {
        if(user){
        res.status(200).json(user)
        } else {
            res.status(404).json({Error: "There was no user found with that ID."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem getting the user."})
    })
})

router.get('/:user_id/habits', requiresAuth, (req, res) => {
    userHabits.getHabitsByUser(req.params.user_id)
    .then(habits => {
        if(habits.length){
            res.status(200).json(habits)
        } else {
            res.status(404).json({message: "There doesn't seem to be any habits by this user id."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem getting the list of habits."})
    })
})

router.get('/:user_id/habits/:id', requiresAuth, (req, res) =>{
    userHabits.getHabitById(req.params.id)
    .then(habit => {
        res.status(200).json(habit)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem getting the habit."})
    })
})

router.post('/:user_id/habits', requiresAuth, (req, res) =>{
    userHabits.addUserHabit({...req.body, user_id: req.params.user_id})
    .then(habit => {
        res.status(201).json(habit)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem adding the habit."})
    })
})

router.delete('/:user_id/habits/:id', requiresAuth, (req, res) => {
    userHabits.removeUserHabit(req.params.id, req.params.user_id)
    .then(habits => {
        res.status(200).json(habits)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem deleting the habit."})
    })
})

router.put('/:user_id/habits/:id', requiresAuth, (req, res) => {
    userHabits.updateUserHabit(req.params.id, req.body)
    .then(habit => {
        res.status(200).json(habit)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem updating that habit."})
    })
})

module.exports = router