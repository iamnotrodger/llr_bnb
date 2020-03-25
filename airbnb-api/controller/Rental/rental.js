// Route (POST): /api/rental/add-rental-agreement
// To Rodger:
//     Here I assume that you will just give 'prid' in the http request,
//     and I will query the database for the hid of this property.
//
//     Besides, I also assume that when a rental agreement is created, 
//     the default value for signing is 'pending'.
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
    }
    const { gid, prid, start_date, end_date } = req.body;
    console.log(gid, prid, start_date, end_date); // test
    
    try {
        const client = await db_pool.connect();
        try {
            const propertyQueryText = 
            'SELECT hid FROM project.property WHERE prid = $1;';
            const res1 = await client.query(propertyQueryText, [prid]);
            const {hid} = res1.rows[0];
            const rentalAgreementQueryText = 
            'INSERT INTO project.rental_agreement(gid, hid, prid, signing, start_date, end_date) VALUES($1, $2, $3, $4, $5, $6);';
            await client.query(rentalAgreementQueryText, [gid, hid, prid, 'pending', start_date, end_date]);
            res.status(200).json('The rental agreement is added');
        } catch (err) {
            console.error('Error during the query.', err.stack);
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

module.exports = {
    handleAddRentalAgreement
}