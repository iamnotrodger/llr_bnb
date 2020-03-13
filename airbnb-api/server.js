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
const profile = require('./controller/Profile/profile');
const profileUpdate = require('./controller/Profile/profifleUpdate');
const property = require('./controller/Property/property');
const propertyList = require('./controller/Property/propertyList');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.end('The server is running on port 3000...');
});

/*handle register*/
app.post('/api/register', (req, res) =>
	register.handleRegister(req, res, db_pool, Joi, CryptoJS)
);

/*handle login*/
app.post('/api/login', (req, res) =>
	login.handleLogin(req, res, db_pool, Joi, CryptoJS)
);

//Get all the user infromation from Usr table
app.get('/api/profile/:uid', (req, res) =>
	profile.handleProfile(req, res, db_pool)
);

//Update the user's email
app.put('/api/profile/update/email', (req, res) =>
	profileUpdate.handleProfileEmail(req, res, db_pool, Joi)
);
//Update the user's password
app.put('/api/profile/update/password', (req, res) =>
	profileUpdate.handleProfilePasswrod(req, res, db_pool, Joi)
);
//Update the user's name
app.put('/api/profile/update/name', (req, res) =>
	profileUpdate.handleProfileName(req, res, db_pool, Joi)
);
//Update the user's address
app.put('/api/profile/update/address', (req, res) =>
	profileUpdate.handleProfileAddress(req, res, db_pool, Joi)
);
//Update the user's phone number
app.put('/api/profile/update/phone', (req, res) =>
	profileUpdate.handleProfilePhone(req, res, db_pool, Joi)
);

//Get all the information about the property, reviews, rooms, and unavailable dates
app.get('/api/property/:prid', (req, res) =>
	property.handleProperty(req, res, db_pool)
);

//Add property
app.post('/api/property/add-property', (req, res) =>
	property.handleAddProperty(req, res, db_pool, Joi)
);

//Gets a number of property according to the type
app.get('/api/property/property-list/:category/:num?', (req, res) =>
	propertyList.handlePropertyList(req, res, db_pool, Joi)
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
}); // listen to port 3000
