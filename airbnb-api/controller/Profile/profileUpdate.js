// Route (PUT): /api/profile/update/email
const handleUpdateEmail = async (req, res, db_pool, Joi) => {
	const schema = {
		email: Joi.string()
			.email()
			.min(3)
			.max(256)
			.required(),
		uid: Joi.number()
			.min(0)
			.required()
	};

	const { error } = Joi.validate(req.body, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { email, uid } = req.body;

	try {
		const client = await db_pool.connect();
		try {
			await client.query('BEGIN');
			// insert into user table
			const userText =
				'UPDATE project.usr SET email = $1 WHERE uid = $2;';
			await client.query(userText, [email, uid]);
			// insert into login table
			const loginText =
				'UPDATE project.login SET email = $1 WHERE email = $1;';
			await client.query(loginText, [email]);
			await client.query('COMMIT');
			res.status(200).send('Successful registration');
		} catch (err) {
			console.error(
				'Error during the transaction, ROLLBACK.',
				err.stack
			);
			await client.query('ROLLBACK');
			res.status(400).send('Error during the update.');
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

// Route (PUT): /api/profile/update/password
const handleUpdatePassword = async (req, res, db_pool, Joi) => {
	const schema = {
		password: Joi.string()
			.min(8)
			.required(),
		email: Joi.string()
			.email()
			.required()
	};

	const { error } = Joi.validate(req.body, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { password, email } = req.body;

	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'UPDATE project.login SET password = $1 WHERE email = $2';
			await client.query(queryText, [password, email]);
			res.status(200).send('Updated passwrod');
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

// Route (PUT): /api/profile/profile/name
const handleUpdateName = async (req, res, db_pool, Joi) => {
	const schema = {
		firstName: Joi.string()
			.max(35)
			.required(),
		middleName: Joi.string().max(35),
		lastName: Joi.string()
			.max(35)
			.required(),
		uid: Joi.number().required()
	};

	const { error } = Joi.validate(req.body, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { firstName, middleName, lastName, uid } = req.body;

	try {
		const client = await db_pool.connect();
		try {
			const queryText =
				'UPDATE project.usr SET firstName = $1, middleName = $2, lastName = $3 WHERE uid = $4';
			await client.query(queryText, [
				firstName,
				middleName,
				lastName,
				uid
			]);
			res.status(200).send('Updated passwrod');
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

//Route (PUT): /api/profile/update/address
const handleUpdateAddress = async (req, res, db_pool, Joi) => {
	const schema = {
		address: Joi.string()
			.max(256)
			.required(),
		uid: Joi.number().requried()
	};

	const { error } = Joi.validate(req.body, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { address, uid } = req.body;

	const { code, message } = await updateUsrTable(
		'address',
		address,
		uid,
		db_pool
	);
	res.status(code).send(message);
};

//Route (PUT): /api/profile/update/phone
const handleUpdatePhone = async (req, res, db_pool, Joi) => {
	const schema = {
		phone: Joi.string()
			.max(256)
			.required(),
		uid: Joi.number().requried()
	};

	const { error } = Joi.validate(req.body, schema);

	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const { phone, uid } = req.body;

	const { code, message } = await updateUsrTable(
		'phone',
		phone,
		uid,
		db_pool
	);
	res.status(code).send(message);
};

const updateUsrTable = async (column, value, uid, db_pool) => {
	try {
		const client = await db_pool.connect();
		try {
			const queryText = `UPDATE project.usr SET ${column} = $1 WHERE uid = $2;`;
			await client.query(queryText, [value, uid]);
			return {
				code: 200,
				comment: `Update on ${value} successful.`
			};
		} catch (err) {
			console.error('Error during the query.', err.stack);
			return { code: 400, comment: 'Error during update.' };
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
			commment: 'Error during the conenction to the databse.'
		};
	}
};

module.exports = {
	handleUpdateEmail,
	handleUpdatePassword,
	handleUpdateName,
	handleUpdateAddress,
	handleUpdatePhone
};
