const express = require('express')

const cors = require('cors')
const helmet = require('helmet')

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())

const authRouter = require('../auth/authRouter')
server.use('/api/auth', authRouter)

const habitsRouter = require('../habits/habitsRouter')
server.use('/api/habits', habitsRouter)

const userRouter = require('../users/usersRouter')
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: "Server is up."})
})

module.exports = server

