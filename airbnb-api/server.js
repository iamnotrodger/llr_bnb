/*set up database*/
const { Pool } = require('pg');
const connection = require('./connection');
const db_pool = new Pool({
	host: connection.host,
	user: connection.user,
	password: connection.password,
	database: connection.database,
	port: 15432
}); // pooled database client
// db_pool.connect()

/*set up web server*/
const express = require('express');
const cors = require('cors');
const app = express();
const Joi = require('joi');

const login = require('./controller/login');
const register = require('./controller/register');

app.use(express.json());
app.use(cors());

app.get('/', function(req, res) {
	res.end('The server is running on port 3000...');
});

/*handle register*/
app.post('/api/register', (req, res) =>
	register.handleRegister(req, res, db_pool, Joi)
);

/*handle login*/
app.post('/api/login', (req, res) => login.handleLogin(req, res, db_pool, Joi));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
}); // listen to port 3000
