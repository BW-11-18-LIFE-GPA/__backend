const request = require('supertest')
const server = require('./server')

describe('server', () => {
    it('should return 200 ok on GET /', () => {
        request(server).get('/')
        .then(res => {
            expect(res.status).toBe(200)
        })
    })

    it('should return json with message: server is up', () =>{
        request(server).get('/')
        .then(res => {
            expect(res.body).toBe({message: "Server is up."})
        })
    })
})