// Route (GET):  /api/property/property-list/:category/:num?
// Grabs the property according to the type and returns a number of property acording to the params
const handlePropertyList = async (req, res, db_pool, Joi) => {
	// Request params with default values.
	const request = {
		category: req.params.category,
		num: req.params.num || 0
	};

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
			.min(0)
	};

	const { error } = Joi.validate(request, schema);

	if (error) {
		res.status(400).json(error.details[0].message);
		return;
	}

	const { category, num } = request;
	try {
		const client = await db_pool.connect();
		try {
			// const queryText =
			// 	'SELECT * FROM project.property, project.pricing  WHERE property_type = $1 AND project.property.prid = project.pricing.prid';
			const queryText =
				'SELECT P.prid, P.title, P.country, AVG(PR.price) as price, AVG(R.rating) as rating FROM project.property as P, project.pricing as PR, project.review as R WHERE property_type = $1 AND P.prid = R.prid AND P.prid = PR.prid GROUP BY P.prid';
			const { rows } = await client.query(queryText, [
				category
			]);

			const length = rows.length;

			if (length === 0) {
				res.status(400).json('No property was found');
				return;
			}
			shuffle(rows);
			const sliceEnd = num > 0 ? num : length;
			res.status(200).json(rows.slice(0, sliceEnd));
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

const shuffle = array => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

module.exports = {
	handlePropertyList
};
