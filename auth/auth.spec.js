const db = require('../data/dbConfig')
const Users = require('./auth-model')
const request = require('supertest')
const server = require('../api/server')

describe('register / login', () =>{

    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    // REGISTER
    it('should register an account', async() =>{
        const register = await request(server).post('/api/auth/register')
        .send({ username: 'robert', password: 'carter', email:'test' })

        const users = await db('users')

        expect(users[0]).toBeDefined()
    })

    it('should register the correct username to the account', async() =>{
        const register = await request(server).post('/api/auth/register')
        .send({ username: 'robert', password: 'carter', email:'test' })

        const users = await db('users')
        expect(users[0].username).toMatch(/robert/i)
    })


     //LOGIN
    it('should return 200 ok on login', async () => {    
        const register = await request(server).post('/api/auth/register')
        .send({ username: 'robert', password: 'carter', email:'test' })

        
        const login = await request(server).post('/api/auth/login')
            .send({ username: 'robert', password: 'carter', email:'test' })
            expect(login.status).toBe(200)
    })

    it('should return a token on login', async() =>{
        const register = await request(server).post('/api/auth/register')
        .send({ username: 'robert', password: 'carter', email:'test' })

        
        const login = await request(server).post('/api/auth/login')
            .send({ username: 'robert', password: 'carter', email:'test' })
            expect(login.body.token).toBeDefined()
    })
})