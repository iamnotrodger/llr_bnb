const handleLogin = async (req, res, db_pool, Joi, CryptoJS) => {
	// handle http request
	const schema = {
		email: Joi.string()
			.min(3)
			.email()
			.required(),
		password: Joi.string()
			.min(8)
			.required()
	};
	const { error } = Joi.validate(req.body, schema);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	const { email, password } = req.body;
	const { words } = CryptoJS.SHA256(password);

	// check the email and password
	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'SELECT password FROM project.login WHERE email = $1;';
			const { rows } = await client.query(queryText, [email]);
			const { password } = rows[0];

			if (words.toString() === password) {
				// try to get uid, gid and hid if it exits
				var ids = {
					uid: null,
					gid: null,
					hid: null
				}
				try {
					{   // get uid
						const uidQueryText = 'SELECT uid from project.usr WHERE email = $1;';
						const { rows } = await client.query(uidQueryText, [email]);
						if (rows[0] != undefined) {
							ids.uid = rows[0].uid
						}
					}
					{   // get gid
						const gidQueryText = 'SELECT gid from project.guest WHERE uid = $1;';
						const { rows } = await client.query(gidQueryText, [ids.uid])
						if (rows[0] != undefined) {
							ids.gid = rows[0].gid
						}
					}
					{   // get hid
						const hidQueryText = 'SELECT hid from project.host WHERE uid = $1;';
						const { rows } = await client.query(hidQueryText, [ids.uid])
						// console.log(rows[0] === undefined) // test
						if (rows[0] != undefined) {
							ids.hid = rows[0].hid
						}
					}
					res.status(200).send(ids);
				} catch (err) {
					console.error('Error during the query.', err.stack);
					res.status(400).send('Something wrong.');
				}
			} else {
				res.status(400).send('Incorrect password.');
			}
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
	handleLogin
};
