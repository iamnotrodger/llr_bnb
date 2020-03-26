// Route (GET): /api/rental/rental-agreement/host/:hid
const handleHostRentalList = async (req, res, db_pool) => {
    // get http path parameter
    const { hid } = req.params;
    
    try {
        const client = await db_pool.connect();
        try {
            const queryText = 
                'SELECT * FROM project.rental_agreement WHERE hid = $1;';
            const { rows } = await client.query(queryText, [hid]);
            // console.log(rows); // test
            res.status(200).jsonp({
                rental_agreement_list: rows
            });
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Unable to get rental agreements');
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

// Route (GET): /api/rental/rental-agreement/guest/:gid
const handleGuestRentalList = async (req, res, db_pool) => {
    // get http path parameter
    const { gid } = req.params;
    // console.log(gid); // test

    try {
        const client = await db_pool.connect();
        try {
            const queryText =
                'SELECT * FROM project.rental_agreement WHERE gid = $1;';
            const { rows } = await client.query(queryText, [gid]);
            // console.log(rows); // test
            res.status(200).jsonp({
                rental_agreement_list: rows
            });
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Unable to get rental agreements');
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
    handleHostRentalList,
    handleGuestRentalList
}