const express = require('express')

const cors = require('cors')
const helmet = require('helmet')

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())

const authRouter = require('../auth/authRouter')
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: "Server is up."})
})

module.exports = server

