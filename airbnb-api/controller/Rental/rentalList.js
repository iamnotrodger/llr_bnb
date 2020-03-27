// Route (GET): /api/rental/rental-agreement/host/:hid
const handleHostRentalList = async (req, res, db_pool) => {
    // get http path parameter
    const { hid } = req.params;
    
    try {
        const client = await db_pool.connect();
        try {
            const rentalAgreementQueryText = 
                'SELECT * FROM project.rental_agreement WHERE hid = $1;';
            const res1 = await client.query(rentalAgreementQueryText, [hid]);
            // console.log(rows); // test
            const paymentQueryText = 
                'SELECT status FROM project.payment WHERE rtid = $1;';
            for (i in res1.rows) {
                const { rtid } = res1.rows[i];
                const res2 = await client.query(paymentQueryText, [rtid]);
                const { status } = res2.rows[0];
                res1.rows[i].status = status;
            }
            res.status(200).jsonp({
                rental_agreement_list: res1.rows
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

    try {
        const client = await db_pool.connect();
        try {
            const queryText =
                'SELECT * FROM project.rental_agreement WHERE gid = $1;';
            const res1 = await client.query(queryText, [gid]);
            const paymentQueryText =
                'SELECT status FROM project.payment WHERE rtid = $1;';
            for (i in res1.rows) {
                const { rtid } = res1.rows[i];
                const res2 = await client.query(paymentQueryText, [rtid]);
                const { status } = res2.rows[0];
                res1.rows[i].status = status;
            }
            res.status(200).jsonp({
                rental_agreement_list: res1.rows
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