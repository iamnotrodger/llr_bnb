/*set up database*/
const {Pool} = require('pg')
const connection = require('./connection')
const db_pool = new Pool({
    host: connection.host,
    user: connection.user,
    password: connection.password,
    database: connection.database,
    port: 15432
}) // pooled database client
// db_pool.connect()

/*set up web server*/
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.listen(3000) // listen to port 3000
app.get('/', function (req, res) {
    res.end('The server is running on port 3000...');
})

/*handle register*/
const register = require('./controller/register')
app.post('/register', (req, res) => register.handleRegister(req, res, db_pool))

/*handle login*/
const login = require('./controller/login')
app.post('/login', (req, res) => login.handleLogin(req, res, db_pool))