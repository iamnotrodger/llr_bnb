// Route (POST): /api/host-register
const handleRegister = async (req, res, db_pool, Joi) => {
	// handle http request
	const { uid, property, rooms, pricing } = req.body;
	const propertySchema = {
		// This schema is different from the one in property.js!
		// This schema doesn't require hid, since hid is generated.
		address: Joi.string()
			.max(255)
			.required(),
		property_type: Joi.string()
			.max(25)
			.valid([
				'House',
				'Apartment',
				'Hotel',
				'Bed and Breakfast'
			])
			.required(),
		country: Joi.string()
			.max(30)
			.required(),
		title: Joi.string()
			.max(60)
			.required()
	};
	const res1 = Joi.validate(property, propertySchema);
	const pricingSchema = {
		guest_num: Joi.number()
			.integer()
			.required(),
		price: Joi.number()
			.required()
	};
	const res2 = Joi.validate(pricing, pricingSchema);
	if (res1.error && res2.error) {
		res.status(400).json(res1.error.details[0].message + '\n'
			+ res2.error.details[0].message);
		return;
	} else if (res1.error) {
		res.status(400).json(res1.error.details[0].message);
		return;
	} else if (res2.error) {
		res.status(400).json(res2.error.details[0].message);
		return;
	}
	const { address, property_type, country, title } = property;
	const { guest_num, price } = pricing;

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
			// add pricing
			const addPricingText =
				'INSERT INTO project.pricing(guest_num, prid, price) VALUES($1, $2, $3);';
			await client.query(addPricingText, [guest_num, prid, price]);
			await client.query('COMMIT');

			res.status(200).jsonp({
				hid: hid
			});
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
};

module.exports = {
	handleRegister
};
