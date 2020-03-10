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
	handlePropertyList,
	handlePropertyListNum
};
