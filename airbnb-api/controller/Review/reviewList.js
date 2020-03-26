// Route (GET) /api/property/reviews/:prid/:num?
const handleReviewProperty = async (req, res, db_pool) => {
	const prid = req.params.prid;
	const num = req.params.num || 0;

	const { code, message, reviews } = await reviewList(
		'prid',
		prid,
		num,
		db_pool
	);

	if (reviews) {
		const ratingAverage =
			reviews.reduce((prev, next) => prev + next.rating, 0) /
			reviews.length;
		console.log(ratingAverage);
		res.status(code).json({
			rating: ratingAverage,
			reviews: reviews
		});
	} else {
		res.status(code).json(message);
	}
};

// Route (GET) /api/profile/reviews/:gid/:num?
const handleReviewProfile = async (req, res, db_pool) => {
	const gid = req.params.gid;
	const num = req.params.num || 0;

	const { code, message, reviews } = await reviewList(
		'gid',
		gid,
		num,
		db_pool
	);

	if (reviews) {
		res.status(code).json(reviews);
	} else {
		res.status(code).json(message);
	}
};

//TODO: add date of when the review was made.
const reviewList = async (column, id, num, db_pool) => {
	try {
		const client = await db_pool.connect();
		try {
			const queryText = `SELECT rating, comment FROM project.review WHERE ${column} = $1 AND rating > 0`;
			const { rows } = await client.query(queryText, [id]);

			const length = rows.length;

			if (length === 0) {
				return {
					code: 400,
					message: 'No reviews was found'
				};
			}

			const sliceEnd = num > 0 ? num : length;
			return { code: 400, reviews: rows.slice(0, sliceEnd) };
		} catch (err) {
			console.error('Error during the query.', err.stack);
			return {
				code: 400,
				message: 'Invalid Input'
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
			code: 400,
			message: 'Error during the connection to the database'
		};
	}
};

module.exports = {
	handleReviewProperty,
	handleReviewProfile
};
