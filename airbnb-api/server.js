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
const guestRegister = require('./controller/Account/guestRegister');
const hostRegister = require('./controller/Account/hostRegister');
const employeeRegister = require('./controller/Account/employeeRegister');

const profile = require('./controller/Account/profile');
const profileUpdate = require('./controller/Account/profileUpdate');

const property = require('./controller/Property/property');
const propertyList = require('./controller/Property/propertyList');

const review = require('./controller/Review/review');
const reviewList = require('./controller/Review/reviewList');

const rental = require('./controller/Rental/rental');
const rentalList = require('./controller/Rental/rentalList');
const payment = require('./controller/Rental/payment');

const empListView = require('./controller/Manage/empListView');

const project = require('./controller/Project/project');

app.use(express.json());
app.use(cors());

/*
 * register and login
 */
// handle guestRegister
app.post('/api/guest-register', (req, res) =>
        guestRegister.handleRegister(req, res, db_pool, Joi, CryptoJS)
);
// handle hostRegister
app.post('/api/host-register', (req, res) =>
        hostRegister.handleRegister(req, res, db_pool, Joi)
);
// handle employeeRegister
app.post('/api/employee-register', (req, res) =>
        employeeRegister.handleRegister(req, res, db_pool, Joi, CryptoJS)
);
// handle login
app.post('/api/login', (req, res) =>
        login.handleLogin(req, res, db_pool, Joi, CryptoJS)
);

/*
 * user profile
 */
// Get all the user infromation from Usr table
app.get('/api/profile/:uid', (req, res) =>
        profile.handleProfile(req, res, db_pool)
);
// Update the user's email
app.put('/api/profile/update/email', (req, res) =>
        profileUpdate.handleUpdateEmail(req, res, db_pool, Joi)
);
// Update the user's password
app.put('/api/profile/update/password', (req, res) =>
        profileUpdate.handleUpdatePasswrod(req, res, db_pool, Joi)
);
// Update the user's name
app.put('/api/profile/update/name', (req, res) =>
        profileUpdate.handleUpdateName(req, res, db_pool, Joi)
);
// Update the user's address
app.put('/api/profile/update/address', (req, res) =>
        profileUpdate.handleUpdateAddress(req, res, db_pool, Joi)
);
// Update the user's phone number
app.put('/api/profile/update/phonenum', (req, res) =>
        profileUpdate.handleUpdatePhone(req, res, db_pool, Joi)
);
// Get all the review that the user has made
app.get('/api/profile/review/review-list/:gid/:num?', (req, res) =>
        reviewList.handleReviewProfile(req, res, db_pool)
);
// Get the property for a host
app.get('/api/profile/:uid/my-property', (req, res) =>
        profile.handleHostProperty(req, res, db_pool)
);
// Get the guests for a property the guest own
app.get('/api/profile/:uid/my-property/:prid', (req, res) =>
        profile.handlePropertyGuest(req, res, db_pool)
);

/*
 * property
 */
// Get all the information about the property, reviews, rooms, and unavailable dates
app.get('/api/property/:prid', (req, res) =>
        property.handleViewProperty(req, res, db_pool)
);
// Add property
app.post('/api/property/add-property', (req, res) =>
        property.handleAddProperty(req, res, db_pool, Joi)
);
// Gets a number of property according to the type
app.get('/api/property/property-list/:category/:num?', (req, res) =>
        propertyList.handlePropertyList(req, res, db_pool, Joi)
);
// Add reviews to property
app.post('/api/review/add-review', (req, res) =>
        review.handleAddReview(req, res, db_pool, Joi)
);
// Gets all the reveiw made about the property
app.get('/api/property/review/review-list/:prid/:num?', (req, res) =>
        reviewList.handleReviewProperty(req, res, db_pool)
);

/*
 * rental agreement
 */
// Add a rental agreement
app.post('/api/rental/add-rental-agreement', (req, res) =>
        rental.handleAddRentalAgreement(req, res, db_pool, Joi)
);
// Get rental agreements for a host
app.get('/api/rental/rental-agreement/host/:hid', (req, res) =>
        rentalList.handleHostRentalList(req, res, db_pool)
);
// Approve or disapprove a rental agreement
app.post('/api/rental/rental-agreement/host/:hid', (req, res) =>
        rental.handleApproval(req, res, db_pool, Joi)
);
// Get rental agreements for a guest
app.get('/api/rental/rental-agreement/guest/:gid', (req, res) =>
        rentalList.handleGuestRentalList(req, res, db_pool)
);
// Pay a rental agreement
app.post('/api/rental/rental-agreement/guest/:gid/payment', (req, res) =>
        payment.handlePayment(req, res, db_pool, Joi)
);

/*
 * employee functionality
 */
// Get the property list for an employee
app.get('/api/employee/:empid/property-list', (req, res) =>
        empListView.handleEmpPropertyList(req, res, db_pool)
);
// Get the list of the guests from the same country with the employee
app.get('/api/employee/:empid/guest-list', (req, res) =>
        empListView.handleGuestList(req, res, db_pool)
);

/**
 * project required queries which cannot fit our design
 */
// query 2
app.get('/api/project/all-guest-list', (req, res) =>
        project.handleAllGuestList(req, res, db_pool)
);
// query 3
app.get('/api/project/completed-cheapest-rental-agreement', (req, res) =>
        project.handleCompletedCheapestRental(req, res, db_pool)
);
// query 4
app.get('/api/project/all-rented-property', (req, res) =>
	project.handleAllRentedProperty(req, res, db_pool)
);
// query 5
app.get('/api/project/all-not-rented-property', (req, res) =>
	project.handleAllNotRentedProperty(req, res, db_pool)
);
// qurery 7
app.get('/api/project/15k-employee', (req, res) =>
	project.handle15kEmployee(req, res, db_pool)
)

app.get('/', (req, res) => {
        res.end('The server is running on port 3000...');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
        console.log(`Listening to port ${port}...`);
}); // listen to port 3000
