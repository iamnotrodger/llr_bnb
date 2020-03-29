// query 2
// Route (GET): /api/project/all-guest-list
const handleAllGuestList = async (req, res, db_pool) => {
    try {
        const client = await db_pool.connect();
        try {
            const queryText = 
                'SELECT * FROM project.guest NATURAL JOIN project.usr ORDER BY country, gid;';
            const res1 = await client.query(queryText);
            // console.log(res1.rows); // test
            res.status(200).jsonp({
                guest_list: res1.rows
            });
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Invalid Inputs.');
        } finally {
            client.release();
        }
    } catch (err) {
        res.status(503).json('Service Unavailable');
        console.error(
            'Error during the connection to the database',
            err.stack
        );
    }
}

// query 3
// Route (GET): /api/project/completed-cheapest-rental-agreement
const handleCompletedCheapestRental = async (req, res, db_pool) => {
    try {
        const client = await db_pool.connect();
        try {
            const queryText =
                'SELECT * FROM project.property NATURAL JOIN project.rental_agreement NATURAL JOIN project.payment WHERE amount >= ALL (SELECT amount FROM project.payment) AND status = \'completed\';';
            const res1 = await client.query(queryText);
            res.status(200).json(res1.rows[0]);
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Invalid Inputs.');
        } finally {
            client.release();
        }
    } catch (err) {
        res.status(503).json('Service Unavailable');
        console.error(
            'Error during the connection to the database',
            err.stack
        );
    }
}

// query 4
// Route (Get): /api/project/all-rented-property
const handleAllRentedProperty = async (req, res, db_pool) => {
    try {
        const client = await db_pool.connect();
        try {
            const queryText =
                'SELECT DISTINCT prid, country, avg_rating, address, property_type, title FROM project.property NATURAL JOIN project.rental_agreement NATURAL JOIN (SELECT prid, AVG(rating) as avg_rating FROM project.review GROUP BY prid) AS rv ORDER BY country, avg_rating;';
            const res1 = await client.query(queryText);
            res.status(200).json(res1.rows);
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Invalid Inputs.');
        } finally {
            client.release();
        }
    } catch (err) {
        res.status(503).json('Service Unavailable');
        console.error(
            'Error during the connection to the database',
            err.stack
        );
    }
}

// query 5
// Route (GET): /api/project/all-not-rented-property
const handleAllNotRentedProperty = async (req, res, db_pool) => {
    try {
        const client = await db_pool.connect();
        try {
            const queryText =
                'SELECT * FROM project.property WHERE prid NOT IN (SELECT prid FROM project.rental_agreement);';
            const res1 = await client.query(queryText);
            res.status(200).json(res1.rows);
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Invalid Inputs.');
        } finally {
            client.release();
        }
    } catch (err) {
        res.status(503).json('Service Unavailable');
        console.error(
            'Error during the connection to the database',
            err.stack
        );
    }
}

module.exports = {
    handleAllGuestList,
    handleCompletedCheapestRental,
    handleAllRentedProperty,
    handleAllNotRentedProperty
}