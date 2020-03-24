// Route (POST): /api/property/add-review
const handleAddReview = async (req, res, db_pool, Joi) => {
	const schema = {
		communication: Joi.number()
			.integer()
			.min(1)
			.max(5)
			.required(),
		cleanliness: Joi.number()
			.integer()
			.min(1)
			.max(5)
			.required(),
		value: Joi.number()
			.integer()
			.min(1)
			.max(5)
			.required(),
		comment: Joi.string()
			.max(140)
			.required(),
		prid: Joi.number()
			.integer()
			.required(),
		gid: Joi.number()
			.integer()
			.required()
	};

	const { error } = Joi.validate(req.body, schema);

	if (error) {
		res.status(400).json(error.details[0].message);
		return;
	}

	const {
		communication,
		cleanliness,
		value,
		comment,
		prid,
		gid
	} = req.body;
	const rating = (communication + cleanliness + value) / 3;

	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'INSERT INTO project.review (prid, gid, rating, communication, cleanliness, value, comment) VALUES ($1, $2, $3, $4, $5, $6, $7)';
			await client.query(queryText, [
				prid,
				gid,
				rating,
				communication,
				cleanliness,
				value,
				comment
			]);

			res.status(200).json('Review was added.');
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

module.exports = {
	handleAddReview
};
