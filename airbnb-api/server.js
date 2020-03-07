// set up database
const {Client} = require('pg')
const connection = require('./connection')
const db = new Client({
    host: connection.host,
    user: connection.user,
    password: connection.password,
    database: connection.database,
    port: 15432
})
db.connect()
// set up web server
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.listen(3000)
app.get('/', function (req, res) {
    res.end('The server is running on port 3000...');
});