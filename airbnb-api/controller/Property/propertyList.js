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
				'SELECT P.prid, P.title, P.country, PR.price, R.rating, R.review_num FROM(project.property as P natural join project.pricing as PR) natural left outer join (SELECT prid, AVG(rating) as rating, COUNT(rating) as review_num from project.review GROUP BY prid) as R WHERE property_type = $1';
			const { rows } = await client.query(queryText, [category]);
			const length = rows.length;
			if (length === 0) {
				res.status(400).json([]);
				return;
			}
			shuffle(rows);
			const sliceEnd = num > 0 ? num : length;
			res.status(200).json(rows.slice(0, sliceEnd));
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).json([]);
		} finally {
			client.release();
		}
	} catch (err) {
		res.status(503).json([]);
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

// Route (GET): /api/employee/:empid/property-list
const handleEmpPropertyList = async (req, res, db_pool) => {
	// get http path parameter
	const { empid } = req.params;

	try {
		const client = await db_pool.connect();
		try {
			const employeeQueryText = 
				'SELECT country FROM project.employee WHERE empid = $1;';
			const res1 = await client.query(employeeQueryText, [empid]);
			const { country } = res1.rows[0];
			const propertyQueryText = 
				'SELECT * FROM project.property WHERE country = $1;';
			const res2 = await client.query(propertyQueryText, [country]);
			// console.log(res2.rows); // test
			res.status(200).jsonp({
				property_list: res2.rows
			})
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).json('Unable to get the property list.');
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
	handlePropertyList,
	handleEmpPropertyList
};
