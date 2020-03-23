const handleRegister = async (req, res, db_pool, Joi) => {
    // handle http request
    const {uid, property, rooms} = req.body;
    const schema = {
        address: Joi.string()
            .max(255)
            .required(),
        property_type: Joi.string()
            .max(15)
            .valid([
                'House',
                'Apartment',
                'Hotel',
                'Bed and Breakfast'
            ])
            .required(),
        title: Joi.string()
            .max(60)
            .required()
    };
    const { error } = Joi.validate(property, schema);
    if (error) {
        return { code: 400, message: error.details[0].message };
    }

    try {
        const client = await db_pool.connect();
        try {
            await client.query('BEGIN');
            // insert uid to the host table
            const hostText = 
                'INSERT INTO project.host(uid) VALUES($1) RETURNING hid;';
            const res1 = await client.query(hostText, [uid]);
            const { hid } = res1.rows[0]; // get hid
            // add property
            const { address, property_type, country, title } = property;
            const addPropertyText = 
                'INSERT INTO project.property(address, property_type, hid, country, title) VALUES($1, $2, $3, $4, $5) RETURNING prid;';
            const res2 = await client.query(addPropertyText, [address, property_type, hid, country, title]);
            const { prid } = res2.rows[0]; // get prid
            // add rooms
            const addRoomText =
                'INSERT INTO project.room(prid, room_type, bed_num) VALUES($1, $2, $3);';
            for (i in rooms) {
                const { room_type, bed_num } = rooms[i];
                await client.query(addRoomText, [prid, room_type, bed_num]);
            }
            await client.query('COMMIT');
            res.status(200).json('Successfully become a host');
        } catch (err) {
            console.error(
                'Error during the transaction, ROLLBACK.',
                err.stack
            );
            await client.query('ROLLBACK');
            res.status(400).json('Error during the registration as a host');
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
    handleRegister
};