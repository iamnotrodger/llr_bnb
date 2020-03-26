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
        start_date: Joi.date()
            .required(),
        end_date: Joi.date()
            .required() // TODO: try to valide end_date > start_end
    };
    const {error} = Joi.validate(req.body, schema);
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    const { gid, prid, start_date, end_date } = req.body;
    // console.log(gid, prid, start_date, end_date); // test
    
    try {
        const client = await db_pool.connect();
        try {
            await client.query('BEGIN');
            // get hid
            const propertyQueryText = 
                'SELECT hid FROM project.property WHERE prid = $1;';
            const res1 = await client.query(propertyQueryText, [prid]);
            const { hid } = res1.rows[0];
            // insert into rental_agreement table and get rtid
            const rentalAgreementQueryText = 
                'INSERT INTO project.rental_agreement(gid, hid, prid, signing, start_date, end_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING rtid;';
            const res2 = await client.query(rentalAgreementQueryText, [gid, hid, prid, 'pending', start_date, end_date]);
            const { rtid } = res2.rows[0];
            // get the price for the property
            const pricingQueryText = 
                'SELECT price FROM project.pricing WHERE prid = $1;';
            const res3 = await client.query(pricingQueryText, [prid]);
            const { price } = res3.rows[0];
            // create a pending payment for the rental agreement
            const paymentQueryText = 
                'INSERT INTO project.payment(rtid, status, amount) VALUES($1, $2, $3)';
            await client.query(paymentQueryText, [rtid, 'pending', price]);
            await client.query('COMMIT');
            res.status(200).json('The rental agreement is added');
        } catch (err) {
            console.error('Error during the transaction, ROLLBACK.', err.stack);
            await client.query('ROLLBACK');
            res.status(400).json('Unable to add the rental agreement.');
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

// Route (POST): /api/rental/rental-agreement/host/:hid
const handleApproval = async (req, res, db_pool, Joi) => {
    // handle http request
    const schema = {
        rtid: Joi.number()
            .integer()
            .required(),
        signing: Joi.string()
            .max(30)
            .valid([
                'approved',
                'disapproved'
            ])
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
                'UPDATE project.rental_agreement SET signing = $1 WHERE rtid = $2 AND hid = $3;';
            await client.query(queryText, [signing, rtid, hid]);
            res.status(200).json('Successfully update the signing');
        } catch (err) {
            console.error('Error during the query.', err.stack);
            res.status(400).json('Unable to sign the rental agreement.');
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
}

module.exports = {
    handleAddRentalAgreement,
    handleApproval
}