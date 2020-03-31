// Route (GET): /api/rental/rental-agreement/host/:hid
const handleHostRentalList = async (req, res, db_pool) => {
    // get http path parameter
    const { hid } = req.params;
    
    try {
        const client = await db_pool.connect();
        try {
            // get all rental agreements
            const rentalAgreementQueryText = 
                'SELECT * FROM project.rental_agreement WHERE hid = $1;';
            const res1 = await client.query(rentalAgreementQueryText, [hid]);
            // get payment status for each rental agreement
            const paymentQueryText = 
                'SELECT pid, status FROM project.payment WHERE rtid = $1;';
            for (i in res1.rows) {
                const { rtid } = res1.rows[i];
                const res2 = await client.query(paymentQueryText, [rtid]);
                const { pid, status } = res2.rows[0];
                res1.rows[i].status = status;
                res1.rows[i].pid = pid;
            }
            // get property title for each rental agreement
            const propertyQueryText =
                'SELECT title FROM project.property WHERE prid = $1;';
            for (i in res1.rows) {
                const { prid } = res1.rows[i];
                const res3 = await client.query(propertyQueryText, [prid]);
                const { title } = res3.rows[0];
                res1.rows[i].title = title;
            }
            // get guest name for each rental agreement for the host
            const guestNameQueryText = 
                'SELECT CONCAT(firstname, \' \', lastname) AS guest_name FROM project.guest NATURAL JOIN project.usr WHERE gid = $1;';
            for (i in res1.rows) {
                const { gid } = res1.rows[i];
                const res4 = await client.query(guestNameQueryText, [gid]);
                const { guest_name } = res4.rows[0];
                res1.rows[i].guest_name = guest_name;
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
            // get all rental agreements
            const queryText =
                'SELECT * FROM project.rental_agreement WHERE gid = $1;';
            const res1 = await client.query(queryText, [gid]);
            // get payment status for each rental agreement
            const paymentQueryText =
                'SELECT pid, status FROM project.payment WHERE rtid = $1;';
            for (i in res1.rows) {
                const { rtid } = res1.rows[i];
                const res2 = await client.query(paymentQueryText, [rtid]);
                const { pid, status } = res2.rows[0];
                res1.rows[i].status = status;
                res1.rows[i].pid = pid;
            }
            // get property title for each rental agreement
            const propertyQueryText = 
                'SELECT title FROM project.property WHERE prid = $1;';
            for (i in res1.rows) {
                const { prid } = res1.rows[i];
                const res3 = await client.query(propertyQueryText, [prid]);
                const { title } = res3.rows[0];
                res1.rows[i].title = title;
            }
            // get host name for each rental agreement for the guest
            const hostNameQueryText = 
                'SELECT CONCAT(firstname, \' \', lastname) AS host_name FROM project.host NATURAL JOIN project.usr WHERE hid = $1;';
            for (i in res1.rows) {
                const { hid } = res1.rows[i];
                const res4 = await client.query(hostNameQueryText, [hid]);
                const { host_name } = res4.rows[0];
                res1.rows[i].host_name = host_name;
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