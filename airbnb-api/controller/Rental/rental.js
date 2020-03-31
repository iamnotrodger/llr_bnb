// Route (POST): /api/rental/add-rental-agreement
const handleAddRentalAgreement = async (req, res, db_pool, Joi) => {
        // handle http request
        const schema = {
                gid: Joi.number()
                        .integer()
                        .required(),
                prid: Joi.number()
                        .integer()
                        .required(),
                start_date: Joi.date().required(),
                end_date: Joi.date()
                        .min(Joi.ref('start_date'))
                        .required()
        };
        const { error } = Joi.validate(req.body, schema);
        if (error) {
                res.status(400).json(error.details[0].message);
                return;
        }
        const { gid, prid, start_date, end_date } = req.body;
        // calculate days
        const start = new Date(start_date);
        const end = new Date(end_date);
        const days = Math.round((end - start) / 1000 / 86400) + 1;

        try {
                const client = await db_pool.connect();
                try {
                        await client.query('BEGIN');
                        // check dates are avaible
                        const checkDatesQueryText = 
                            'SELECT * FROM project.rental_agreement WHERE prid = $1 AND (start_date, end_date) OVERLAPS ($2, $3);';
                        const res0 = await client.query(checkDatesQueryText, [prid, start_date, end_date]);
                        // console.log(res0.rows.length); // test
                        if (res0.rows.length != 0) {
                            // there are dates overlapping
                            res.status(400).json('Some dates are avaible')
                            return;
                        }
                        // get hid
                        const propertyQueryText =
                                'SELECT hid FROM project.property WHERE prid = $1;';
                        const res1 = await client.query(propertyQueryText, [
                                prid
                        ]);
                        const { hid } = res1.rows[0];
                        // insert into rental_agreement table and get rtid
                        const rentalAgreementQueryText =
                                'INSERT INTO project.rental_agreement(gid, hid, prid, signing, start_date, end_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING rtid;';
                        const res2 = await client.query(
                                rentalAgreementQueryText,
                                [
                                        gid,
                                        hid,
                                        prid,
                                        'pending',
                                        start_date,
                                        end_date
                                ]
                        );
                        const { rtid } = res2.rows[0];
                        // get the price for the property
                        const pricingQueryText =
                                'SELECT price FROM project.pricing WHERE prid = $1;';
                        const res3 = await client.query(pricingQueryText, [
                                prid
                        ]);
                        const { price } = res3.rows[0];
                        // create a pending payment for the rental agreement
                        const paymentQueryText =
                                'INSERT INTO project.payment(rtid, status, amount) VALUES($1, $2, $3) RETURNING pid';
                        const res4 = await client.query(paymentQueryText, [
                                rtid,
                                'pending',
                                price * days
                        ]);
                        const { pid } = res4.rows[0];
                        // console.log(price * days); // test
                        await client.query('COMMIT');
                        res.status(200).jsonp({
                                rtid: rtid,
                                pid: pid
                        });
                } catch (err) {
                        console.error(
                                'Error during the transaction, ROLLBACK.',
                                err.stack
                        );
                        await client.query('ROLLBACK');
                        res.status(400).json(
                                'Unable to add the rental agreement.'
                        );
                } finally {
                        client.release();
                }
        } catch (err) {
                // console.log('???'); // test
                res.status(503).json('Service Unavailable');
                console.error(
                        'Error during the connection to the database',
                        err.stack
                );
        }
};

// Route (POST): /api/rental/rental-agreement/host/:hid
const handleApproval = async (req, res, db_pool, Joi) => {
        // handle http request
        const schema = {
                rtid: Joi.number()
                        .integer()
                        .required(),
                signing: Joi.string()
                        .max(30)
                        .valid(['approved', 'disapproved'])
                        .required()
        };
        const { error } = Joi.validate(req.body, schema);
        if (error) {
                res.status(400).json(error.details[0].message);
                return;
        }
        const { rtid, signing } = req.body;
        const { hid } = req.params;

        try {
                const client = await db_pool.connect();
                try {
                        const queryText =
                                'UPDATE project.rental_agreement SET signing = $1, signing_date = $2 WHERE rtid = $3 AND hid = $4;';
                        const today = new Date();
                        const date =
                                today.getFullYear() +
                                '-' +
                                (today.getMonth() + 1) +
                                '-' +
                                today.getDate();
                        // console.log(date); // test
                        await client.query(queryText, [signing, date, rtid, hid]);
                        res.status(200).json('Successfully update the signing');
                } catch (err) {
                        console.error('Error during the query.', err.stack);
                        res.status(400).json('Unable to get rental agreements');
                } finally {
                        client.release()
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
        handleAddRentalAgreement,
        handleApproval
};
