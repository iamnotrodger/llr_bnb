// Route (GET): /api/profile/:uid
const handleProfile = async (req, res, db_pool) => {
	const { uid } = req.params;
	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'SELECT * FROM project.user WHERE uid = $1;';
			const { rows } = await client.query(queryText, [uid]);

			if (rows.length > 0) {
				res.status(200).json(rows[0]);
			} else {
				res.status(400).json('User does not exist');
			}
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

// Route (GET): /api/profile/:uid/my-property
const handleHostProperty = async (req, res, db_pool) => {
	// get the http path parameter
	const { uid } = req.params;

	try {
		const client = await db_pool.connect();
		try {
			// get the hid with uid
			// if the user is not a host, reject the query
			const hostQueryText = 
				'SELECT hid FROM project.host WHERE uid = $1;';
			const res1 = await client.query(hostQueryText, [uid])
			if (res1.rows.length == 0) {
				res.status(400).json('You are not a host yet');
				await client.release();
				return;
			}
			const { hid } = res1.rows[0];
			// get the property list
			const propertyQueryText =
				'SELECT * FROM project.property WHERE hid = $1;';
			const res2 = await client.query(propertyQueryText, [hid]);
			res.status(200).jsonp({
				property_list: res2.rows
			});
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
}

module.exports = {
	handleProfile,
	handleHostProperty
};
