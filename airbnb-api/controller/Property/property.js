//Route (GET): /api/property/:prid
//TODO: grab all the reviews with the property id, this will probably will be a array of review objects.
//TODO: grab all the rooms with the property id, this will probably will be a array of room objects.
//TODO: grab the pricing of the property
//TODO: grab rental agreement to see the available dates, then create an array of unavailable dates according to every start and end dates in every rental agreement the rental agreement
const handleProperty = async (req, res, db_pool) => {
	const { prid } = req.params;

	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'SELECT * FROM project.property WHERE prid = $1;';
			const { rows } = await client.query(queryText, [prid]);
			res.status(200).json(rows[0]);
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).json('Unable to get property.');
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

// Route (POST): /api/property/add-property
const handleAddProperty = async (req, res, db_pool, Joi) => {
	// handle http request
	const {property, rooms, pricing} = req.body;
	// console.log(pricing); // test
	const { code, message } = await addProperty(db_pool, property, rooms, pricing, Joi);
	res.status(code).json(message);
};

const addProperty = async (db_pool, property, rooms, pricing, Joi) => {
	// validate
	const propertySchema = {
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
		hid: Joi.number()
			.required(),
		country: Joi.string()
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
		return {
			code: 400,
			message: res1.error.details[0].message + '\n'
				+ res2.message.error.details[0].message
		}
	} else if (res1.error) {
		return { 
			code: 400, 
			message: res1.error.details[0].message 
		};
	} else if (res2.error) {
		return {
			code: 400, 
			message: res2.error.details[0].message
		};
	}
	const { address, property_type, hid, country, title} = property;
	const { guest_num, price } = pricing;

	try {
		const client = await db_pool.connect();
		try {
			await client.query('BEGIN');
			// insert the property into the property table
			const addPropertyText =
				'INSERT INTO project.property(address, property_type, hid, country, title) VALUES($1, $2, $3, $4, $5) RETURNING prid;';
			const {rows} = await client.query(addPropertyText, [address, property_type, hid, country, title]);
			// get prid
			const {prid} = rows[0];
			// console.log(prid) // test
			// insert the rooms into the room table
			const addRoomText = 
				'INSERT INTO project.room(prid, room_type, bed_num) VALUES($1, $2, $3);';
			for (i in rooms) {
				const {room_type, bed_num} = rooms[i];
				await client.query(addRoomText, [prid, room_type, bed_num]);
			}
			// insert the pricing into the pricing table
			const addPricingText = 
				'INSERT INTO project.pricing(guest_num, prid, price) VALUES($1, $2, $3);';
			await client.query(addPricingText, [guest_num, prid, price]);
			await client.query('COMMIT');
			return { code: 200, message: 'Property was added.' };
		} catch (err) {
			console.error('Error during the transaction, ROLLBACK.', err.stack);
			await client.query('ROLLBACK');
			return {
				code: 400,
				message: 'Unable to add property'
			};
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(
			'Error during the connection to the database',
			err.stack
		);
		return {
			code: 503,
			message: 'Error during the connection to the database'
		};
	}
};

const handleAddRooms = async (req, res, db_pool) => {
	const {prid, rooms} = req.body;
	const { code, message } = await addRooms(db_pool, prid, rooms);
	res.status(code).json(message);
};

const addRooms = async (db_pool, prid, rooms) => {
	try {
		const client = await db_pool.connect();
		try {
			const addRoomText =
				'INSERT INTO project.room(prid, room_type, bed_num) VALUES($1, $2, $3);';
			for (i in rooms) {
				const { room_type, bed_num } = rooms[i];
				await client.query(addRoomText, [prid, room_type, bed_num]);
			}
			return { code: 200, message: 'Property was added.' };
		} catch (err) {
			console.error('Error during inserting values to the room table.', err.stack);
			return {
				code: 400,
				message: 'Unable to add rooms'
			};
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(
			'Error during the connection to the database',
			err.stack
		);
		return {
			code: 503,
			message: 'Error during the connection to the database'
		};
	}
};

module.exports = {
	handleProperty,
	handleAddProperty,
	addProperty,
	handleAddRooms,
	addRooms
};
