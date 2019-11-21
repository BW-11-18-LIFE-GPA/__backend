const Habits = require('./habits-model')
const db = require('../data/dbconfig')

describe('habits model', () => {

    beforeEach(async() =>{
        await db('habits').truncate()
    })

    describe('fetchAll', () => {

        it('fetches all habits', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})
            await db('habits').insert({name: "habit2", description:"habit2"})
            await db('habits').insert({name: "habit3", description:"habit3"})

            const fetch =  await Habits.fetchAll()

            expect(fetch).toHaveLength(3)
        })

        it('fetches nothing if no habits are inserted.', async() => {
            const habits = await Habits.fetchAll()

            expect(habits).toHaveLength(0)
        })
    })

    describe('fetchById', () => {
        it('fetches the correct habit', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})
            await db('habits').insert({name: "habit2", description:"habit2"})

            const habit = await Habits.fetchById(1)
            expect(habit.name).toBe('habit1')
        })

        it('fetches only one habit', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})
            await db('habits').insert({name: "habit2", description:"habit2"})

            const habit = await Habits.fetchById(1)
            expect(habit).not.toBeInstanceOf(Array)
        })
    })

    describe('add habit', () => {
        it('adds one habit at a time', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})

            const habits = await db('habits')

            expect(habits).toHaveLength(1)
        })

        it('adds the correct habit', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})

            const habits = await db('habits')

            expect(habits[0].name).toBe('habit1')
        })
    })

    describe('remove habit', async() => {
        it('removes a habit', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})
            await db('habits').insert({name: "habit2", description:"habit2"})

            await Habits.removeHabit(1)

            const habits = await db('habits')

            expect(habits).toHaveLength(1)
        })

        it('removes the habit with the correct id', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})
            await db('habits').insert({name: "habit2", description:"habit2"})

            await Habits.removeHabit(1)

            const habits = await db('habits')

            expect(habits[0].id).toBe(2)
        })
    })

    describe('update habit', async() => {
        it('updates the correct information', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})
            await db('habits').insert({name: "habit2", description:"habit2"})

            await Habits.updateHabit(1, {name:"updated"})

            const habits = await db('habits')

            expect(habits[0].name).toBe('updated')
        })

        it('should not update if given a key that does not exist', async() => {
            await db('habits').insert({name: "habit1", description:"habit1"})
            await db('habits').insert({name: "habit2", description:"habit2"})

            try {
            await Habits.updateHabit(1, {weird: "value"})
            } catch {
                Error: "There was an error"
            }
            
            const habits = await db('habits')

            expect(habits[0].weird).toBeUndefined()
        })
    })
})