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

/*require modules*/
const Joi = require('joi');
const CryptoJS = require('crypto-js');

/*require controllers*/
const login = require('./controller/login');
const register = require('./controller/register');
const property = require('./controller/property');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.end('The server is running on port 3000...');
});

/*handle register*/
app.post('/api/register', (req, res) =>
	register.handleRegister(req, res, db_pool, Joi)
);

/*handle login*/
app.post('/api/login', (req, res) => login.handleLogin(req, res, db_pool, Joi));

//Add property
app.post('/api/property/add-property', (req, res) =>
	property.handleAddProperty(req, res, db_pool, Joi)
);

//Gets all the list of property according to the type
app.get('/api/property/property-list/:category', (req, res) =>
	property.handlePropertyList(req, res, db_pool, Joi)
);

//Gets a number of property according to the type
app.get('/api/property/property-list/:category/:num', (req, res) =>
	property.handlePropertyListNum(req, res, db_pool, Joi)
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
}); // listen to port 3000
