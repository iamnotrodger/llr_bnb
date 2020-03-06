const express = require('express');
const cors = require('cors');
const connection = require('./connection')
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: connection.host,
        user: connection.user,
        password: connection.password,
        databse: connection.databse
    }
});
const app = express();

app.listen(3000);
app.use(express.json());
app.use(cors());
app.get('/', function (req, res) {
    res.end('The server is running on port 3000...');
});
app.post('/register', function (req, res) {
    const { email, password } = req.body;
    res.status(200).send('OK');
    res.end();
    console.log(email + " " + password);
});