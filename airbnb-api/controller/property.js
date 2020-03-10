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
			const queryText = 'SELECT';
			await client.query(queryText, [prid]);
			res.status(200).json();
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).send('Unable to add property.');
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

	const { error } = Joi.validate(req.body, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { address, category } = req.body;

	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'INSERT INTO project.property(address, category) VALUES($1, $2);';
			await client.query(queryText, [address, category]);
			res.status(200).send('Property has been added.');
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).send('Unable to add property.');
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

// Route (GET): /api/property/property-list/:category
//This will grap every property with the category
const handlePropertyList = async (req, res, db_pool, Joi) => {
	const schema = {
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

	const { error } = Joi.validate(req.params, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { category } = req.params;

	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'SELECT * FROM project.property WHERE category = $1';
			const { rows } = await client.query(queryText, [
				category
			]);

			if (rows.length === 0) {
				res.status(400).send('No property was found');
				return;
			}

			res.status(200).json(rows);
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).send('Invalid Inputs.');
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

// Route (GET):  /api/property/property-list/:category/:num
// Grabs the property according to the type and returns a number of property acording to the params
const handlePropertyListNum = async (req, res, db_pool, Joi) => {
	const schema = {
		category: Joi.string()
			.max(15)
			.valid([
				'House',
				'Apartment',
				'Hotel',
				'Bed and Breakfast'
			])
			.required(),
		num: Joi.number()
			.integer()
			.min(1)
			.required()
	};

	const { error } = Joi.validate(req.params, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { category, num } = req.params;
	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'SELECT * FROM project.property WHERE category = $1';
			const { rows } = await client.query(queryText, [
				category
			]);

			if (rows.length === 0) {
				res.status(400).send('No property was found');
				return;
			}

			const apartmentList = rows.slice(0, num);
			res.status(200).json(apartmentList);
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).send('Invalid Inputs.');
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

module.exports = {
	handleProperty,
	handleAddProperty,
	handlePropertyList,
	handlePropertyListNum
};
