// WARNING: without encryption
// TODO: encrypt the password
const handleLogin = async (req, res, db_pool, Joi) => {
	// handle http request
	const schema = {
		email: Joi.string()
			.min(3)
			.email()
			.required(),
		password: Joi.string()
			// .min(8)
			.required()
	};
	const { error } = Joi.validate(req.body, schema);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	const { email, password } = req.body;
	const input_password = password;

	// check the email and password
	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'SELECT password FROM project.login WHERE email = $1';
			const {rows} = await client.query(queryText, [email]);
			const {password} = rows[0];
			if (input_password == password) {
				res.status(200).send('Login successfully');
			} else {
				res.status(400).send('Incorrect password.');
			}
		} catch (err) {
			console.error('Error during the query.', err.stack);
			res.status(400).send('Invalid Inputs.');
		} finally {
			client.release()
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
