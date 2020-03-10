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
				'SELECT * FROM project.property WHERE prid = $1 ';
			const { rows } = await client.query(queryText, [prid]);
			res.status(200).json(rows[0]);
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).send('Unable to get property.');
		} finally {
			client.release();
		}
	} catch (err) {
		res.status(503).send('Service Unavailable');
		console.error(
			'Error during the connection to the database',
			err.stack
		);
	}
};

// Route (POST): /api/property/add-property
//TODO: must do a transaction, insert into the Room table
//TODO: must get the price from the Pricing table
const handleAddProperty = async (req, res, db_pool, Joi) => {
	const { code, message } = await addProperty(db_pool, req.body, Joi);
	res.status(code).send(message);
};

const addProperty = async (db_pool, property, Joi) => {
	const schema = {
		address: Joi.string()
			.max(255)
			.required(),
		category: Joi.string()
			.max(15)
			.valid([
				'House',
				'Apartment',
				'Hotel',
				'Bed and Breakfast'
			])
			.required()
	};

	const { error } = Joi.validate(property, schema);

	if (error) {
		return { code: 400, message: error.details[0].message };
	}

	const { address, category } = property;
	console.log(address, category);

	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'INSERT INTO project.property(address, category) VALUES($1, $2);';
			await client.query(queryText, [address, category]);
			return { code: 200, message: 'Property was added.' };
		} catch (err) {
			console.error('Error during the query.', err.stack);
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
			code: 500,
			message: 'Error during the connection to the database'
		};
	}
};

module.exports = {
	addProperty,
	handleProperty,
	handleAddProperty
};
