const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

//routes
app.get('/', async (req, res) => {
    const client = await pool.connect()
    try {
        const data = await client.query('SELECT * FROM schools')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    finally {
        client.release()
    }
})

app.post('/', async (req, res) => {
    if (!req.body.name || !req.body.address) {
        return res.status(400).send({ message: "Name and address are required" });
    }
    const { name, address } = req.body
    const client = await pool.connect()
    try {
        await client.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, address])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    finally {
        client.release()
    }
})

app.get('/setup', async (req, res) => {
    const client = await pool.connect()
    try {
        await client.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
        res.status(200).send({ message: "Successfully created table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    finally{
        client.release()
    }
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))

module.exports = app