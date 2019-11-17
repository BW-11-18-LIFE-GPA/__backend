const router = require('express').Router()
const habits = require('./habits-model')
const requiresAuth = require('../auth/authMiddleware')

router.get('/', (req, res) => {
    habits.fetchAll()
    .then(habits => {
        res.status(200).json(habits)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem getting the list of habits."})
    })
})

router.get('/:id', (req, res) => {
    habits.fetchById(req.params.id)
    .then(habit => {
        if(habit){
        res.status(200).json(habit)
        } else {
            res.status(404).json({Error: "There is no habit with that ID."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem getting the habit by that ID."})
    })
})

router.post('/', requiresAuth, (req, res) => {
    habits.addHabit(req.body)
    .then(habit => {
        res.status(201).json(habit)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem adding a habit."})
    })
})

router.put('/:id', requiresAuth, (req, res) => {
    habits.updateHabit(req.params.id, req.body)
    .then(habit => {
        res.status(200).json(habit)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem updating the habit."})
    })
})

router.delete('/:id', requiresAuth, (req, res) => {
    habits.removeHabit(req.params.id)
    .then(habit => {
        res.status(200).json({message: `Habit with id ${req.params.id} has been deleted.`})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "There was a problem deleting that habit."})
    })
})


module.exports = router