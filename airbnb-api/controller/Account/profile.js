// Route (GET): /api/profile/:uid
const handleProfile = async (req, res, db_pool) => {
        const { uid } = req.params;
        try {
                const client = await db_pool.connect();
                try {
                        const queryText =
                                'SELECT * FROM project.usr WHERE uid = $1;';
                        const { rows } = await client.query(queryText, [uid]);

                        if (rows.length > 0) {
                                res.status(200).json(rows[0]);
                        } else {
                                res.status(400).json('User does not exist');
                        }
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
};

// Route (GET): /api/profile/:uid/my-property
const handleHostProperty = async (req, res, db_pool) => {
        // get the http path parameter
        const { uid } = req.params;

        try {
                const client = await db_pool.connect();
                try {
                        // get the hid with uid
                        // if the user is not a host, reject the query
                        const hostQueryText =
                                'SELECT hid FROM project.host WHERE uid = $1;';
                        const res1 = await client.query(hostQueryText, [uid]);
                        if (res1.rows.length == 0) {
                                res.status(400).json('You are not a host yet');
                                await client.release();
                                return;
                        }
                        const { hid } = res1.rows[0];
                        // get the property list
                        const propertyQueryText =
                                'SELECT P.prid, P.title, P.country, PR.price, R.rating, R.review_num FROM(project.property as P natural join project.pricing as PR) natural left outer join (SELECT prid, AVG(rating) as rating, COUNT(rating) as review_num from project.review GROUP BY prid) as R WHERE P.hid = $1';
                        const res2 = await client.query(propertyQueryText, [
                                hid
                        ]);
                        res.status(200).json(res2.rows);
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
};

// Route (GET): /api/profile/:uid/my-property/:prid
const handlePropertyGuest = async (req, res, db_pool) => {
        // get the http path parameter
        const { prid } = req.params;

        try {
                const client = await db_pool.connect();
                try {
                        // Get rtids of this property
                        const rentalAgreementQueryText =
                                'SELECT rtid FROM project.rental_agreement WHERE prid = $1;';
                        const res1 = await client.query(
                                rentalAgreementQueryText,
                                [prid]
                        );
                        // console.log(res1.rows); // test
                        // get the guest info and some other info with rtids
                        const joinQueryText =
                                "SELECT CONCAT(firstname, ' ', lastname) AS guest_name, amount AS rental_price, signing_date, country AS branch, method AS payment_type, status AS payment_status FROM project.rental_agreement NATURAL JOIN project.payment NATURAL JOIN project.guest NATURAL JOIN project.usr WHERE rtid = $1 ORDER BY payment_type ASC, signing_date DESC;";
                        var guest_list = [];
                        for (i in res1.rows) {
                                const { rtid } = res1.rows[i];
                                const res2 = await client.query(joinQueryText, [
                                        rtid
                                ]);
                                console.log(res2.rows[0]); // test
                                guest_list.push(res2.rows[0]);
                        }
                        res.status(200).jsonp({
                                guest_list: guest_list
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
};

module.exports = {
        handleProfile,
        handleHostProperty,
        handlePropertyGuest
};
